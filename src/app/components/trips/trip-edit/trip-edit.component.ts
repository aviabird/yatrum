import { PlaceFormService } from './../../../services/forms/place-form.service';
import { TripFormService } from './../../../services/forms/trip-form.service';
import { ToastyService } from 'ng2-toasty';
import { TripsService } from './../../../services/trips.service';
import { Subscription } from 'rxjs/Subscription';
import { SaveTripAction, UpdateTripAction } from './../../../actions/trips.action';
import { State } from './../../../reducers/index';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'tr-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TripEditComponent implements OnInit {
  private subscription: Subscription;
  trip$: Observable<any>;
  isNewTrip: boolean; 
  trip = null;
  tripForm: FormGroup;
  totalPlaces: number = 0;
  tags: string[] = [];
  autocompleteTags: string[] = ['Ski and snowboarding holidays', 'Journeys by rail', 'Cruises','Safaris and wildlife','Arts and culture',
                                'Camping', 'Golf','Spa holidays', 'Solo Travel', 'Great drives', 'Food and wine holidays',
                                'Walking holidays', 'Activity and Adventure', 'Festivals and events', 'Cycling'];

  constructor(private formBuilder: FormBuilder, private store: Store<State>, 
    private route: Router, private tripService: TripsService,
    private toastyService: ToastyService,
    private tripFormService: TripFormService,
    private placeFormService: PlaceFormService) {
      document.body.scrollTop = 0;
      this.trip$ = this.store.select(fromRoot.getSelectedTrip);
      this.isNewTrip = this.checkIfTripIsNew();
      if(!this.isNewTrip) {
        this.trip$.subscribe(trip => this.trip = trip);
      }
      this.initForm();
  }

  ngOnInit() {
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
    this.tags = this.tripForm.value.tag_list;
    this.addPlaces();
  }


// add places to the tripForm from existing trip
  private addPlaces() {
    this.trip.places.forEach((place, placeIndex) => {
      this.totalPlaces++;
      (<FormArray>this.tripForm.controls['places']).push(this.placeFormService.initPlace(place))
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
    if(this.totalPlaces == 1) {
      this.toastyService.warning({ title: "Invalid Trip", msg: "Cannot Delete Last Place" });
      return;
    }
    this.totalPlaces--;
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
    this.totalPlaces++;
    (<FormArray>this.tripForm.controls['places']).push(this.placeFormService.initPlace());
  }

  onSubmit() {
    this.addTagsToTrips();

    if(!this.tripForm.valid) {
      // this.toastyService.warning({ title: "Invalid Trip", msg: "Trip must contain Name and atleast One Place" });
      $('.trip-submit-error').removeClass("hide")
                             .delay(4500)
                             .queue(function() {
                                $(this).addClass("hide");
                                $(this).dequeue();
                             });
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

  private addTagsToTrips() {
    let tagsArray = this.formBuilder.array(this.tags);
    this.tripForm.setControl('tag_list', tagsArray);
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
