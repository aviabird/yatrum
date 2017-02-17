import { PlaceFormService } from './../../../services/forms/place-form.service';
import { TripFormService } from './../../../services/forms/trip-form.service';
import { ToastyService } from 'ng2-toasty';
import { TripsService } from './../../../services/trips.service';
import { Subscription } from 'rxjs/Rx';
import { SaveTripAction, UpdateTripAction } from './../../../actions/trips.action';
import { State } from './../../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'tr-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss']
})

export class TripEditComponent implements OnInit {
  private subscription: Subscription;
  trip$: Observable<any>;
  isNewTrip: boolean; 
  trip = null;
  tripForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<State>, 
    private route: Router, private tripService: TripsService,
    private toastyService: ToastyService,
    private tripFormService: TripFormService,
    private placeFormService: PlaceFormService) {
      this.trip$ = this.store.select(fromRoot.getSelectedTrip);
      this.isNewTrip = this.checkIfTripIsNew();
      if(!this.isNewTrip) {
        this.trip$.subscribe(trip => this.trip = trip);
      }
      this.initForm();
  }

  ngOnInit() {
    this.tripForm.valueChanges.subscribe((value) => console.log("tripForm", this.tripForm.value));
  }

  private checkIfTripIsNew() {
    return (this.route.url == "/trips/new") ? true : false
  }

  private initForm() {
    if(this.isNewTrip)
      this.initNewTrip();
    else
      this.initExistingTrip();
  }

// if trip is being newly created
  private initNewTrip() {
    this.tripForm = this.tripFormService.initTrip();
    this.addNewPlace();
  }

// if trip is being updated
  private initExistingTrip() {
    this.tripForm = this.tripFormService.initTrip(this.trip);
    this.addPlaces();
  }


// add places to the tripForm from existing trip
  private addPlaces() {
    this.trip.places.forEach((place, placeIndex) => {
      (<FormArray>this.tripForm.controls['places']).push(this.placeFormService.initPlace(place))
      this.addPictures(place,placeIndex);
    }) 
  }


// add pictures to the tripForm from existing trip
  private addPictures(place, index) {
    place.pictures.forEach((picture) => {
      (<FormArray>(<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['pictures']).push(
        this.formBuilder.group({
          'id': [picture.id, Validators.required],
          'url': [picture.url, Validators.required],
          'description': [picture.description],
          'public_id': [picture.public_id, Validators.required],
          '_destroy': [false]        
        })
      )
    })
  }

// update existing place
  updatePlace(place, index) {
    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['name'].setValue(place.name);
    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['review'].setValue(place.review);
    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['_destroy'].setValue(place._destroy);
    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['visited_date'].setValue(place.visited_date);

    let empty = this.formBuilder.array([]);

    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).setControl('pictures', empty); 
    
    place.pictures.forEach((picture) => {
      (<FormArray>(<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['pictures']).push(
        this.formBuilder.group(picture)
      )
    })
  }  

// remove place
  removePlace(place, index) {
    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['name'].setValue(place.name);
    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['review'].setValue(place.review);
    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['_destroy'].setValue(true);
    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['visited_date'].setValue(place.visited_date);

    let empty = this.formBuilder.array([]);

    (<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).setControl('pictures', empty); 
    
    place.pictures.forEach((picture) => {
      (<FormArray>(<FormGroup>(<FormArray>this.tripForm.controls['places']).controls[index]).controls['pictures']).push(
        this.formBuilder.group(picture)
      )
    })  
  }


  addNewPlace() {
    (<FormArray>this.tripForm.controls['places']).push(this.placeFormService.initPlace());
  }

  onSubmit() {
    if(!this.tripForm.valid) {
      this.toastyService.warning({ title: "Invalid Trip", msg: "Trip must contain Name and atleast One Place" });
      return;
    }

    if(this.isNewTrip){
      this.tripService.saveTrip(this.tripForm.value)
        .subscribe();
    }
    else
      this.tripService.updateTrip(this.tripForm.value)
        .subscribe();
  }

  // Validation for trip places
  validatePlaces(c: FormControl) {
    let places = c.value;
    
    places.forEach(place => {
      if(place._destroy == false)
        return null;
    })
    
    return {
      validatePlaces: "Trip must contain at least one place"
    }

  }

}
