import { Place } from './../../../models/place';
import { City } from './../../../models/city';
import { Router, ActivatedRoute } from '@angular/router';
import { Trip } from './../../../models/trip';
import { Observable } from 'rxjs/Observable';
import { SaveTripAction, UpdateTripAction, ClearEditingTripAction, AddTripToLocalStore } from './../../../actions/trips.action';
import { Store } from '@ngrx/store';
import { createSelector } from 'reselect';
import { Form, FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'tr-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss']
})
export class TripEditComponent implements OnInit {
  tripForm: FormGroup;
  editingStatus$: Observable<boolean>;
  isEditing: boolean = false; // calling create/update service methods
  isNewTrip: boolean = true; // editing/creating a trip
  trip$: Observable<Trip>;
  tripId: String;

  constructor(private fb: FormBuilder, 
              private store: Store<fromRoot.State>,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
    this.redirectUponCreate();
  }

  ngOnInit() {
    this.initForm()
    this.setEditingTrip();    
  }

  /** 
   * sets the editing status
   */
  setEditingTrip() {
    if (this.idPresentInParams()) {
      this.isEditing = true;
      let getSelectedTrip$ = this.store.select(fromRoot.getSelectedTrip);
      getSelectedTrip$.subscribe((trip) => {
        this.resetFormDataWithStoreTrip(trip);
      })
    } else {
      this.isEditing = false;
      console.log('creating a trip');      
    }
  }

  /**
   * helper method returns true if id is present in params
   */
  idPresentInParams(){
    return 'id' in this.activatedRoute.snapshot.params
  }

  /**
   * 1. Redirect after successful trip creation
   * 2. Clear editingTrip from store
   * 3. Add the created to local trip store
   * @method redirectUponCreate
   */
  redirectUponCreate() {
    this.trip$ = this.store.select(fromRoot.getEditingTrip);
    
    this.trip$.subscribe((trip) => {
      if (trip && trip.hasOwnProperty('id')){
        this.tripId = trip.id;
        this.store.dispatch(new AddTripToLocalStore(trip));
        this.router.navigateByUrl(`/trips/${this.tripId}`);
        this.store.dispatch(new ClearEditingTripAction());
      }
    })
  }
  
  /**
   * Set the create form with latest data trip from the backend updates ids
   * @method setFormDataWithStoreTrip
   * @param {Trip} trip from the store
   * @return void
   * 
   * @unstable
   */
  resetFormDataWithStoreTrip(trip: Trip):void {
    // patchValue It doesn't work the way we want it
    // Mimicking its behavious using setValue.
    // this.tripForm.patchValue(trip); 
    this.tripForm.controls['id'].setValue(trip.id);
    this.tripForm.controls['name'].setValue(trip.name);
    this.tripForm.controls['description'].setValue(trip.description);

    trip.cities.forEach((city, cityIndex) => {
      this.addCity(city);
      city.places.forEach((place, placeIndex) =>{
        this.addPlace(cityIndex, place);
        //NOTE: Media should be assigned here
      })
    })
  }

  /**
   * redirect user back
   * @method onCancel
   */
  onCancel() {
    console.log('Cancel button clicked');
    // redirect to back
  }

  /**
   * Sends update and create method requests to the api
   * @method onSubmit
   */
  onSubmit() {
    // Set the editing trip everytime we get a success response from the 
    // create success action and if the editing trip has some value(id) 
    // or something then we send an update trip request.
    if( this.tripForm.valid ) {
      if( this.isEditing === false ) {
        this.store.dispatch(new SaveTripAction(this.tripForm.value));
      } else {
        this.store.dispatch(new UpdateTripAction(this.tripForm.value));
      }
    }
  }

  /**
   * Initialises the tripForm 
   * @method initForm
   */
  initForm():void {
    let name = 'Trip';
    let description = 'Desert safari';
    // let status = "completed"; //TODO use a checkbox or a select box.
    let startDate = Date.now();
    let endDate = Date.now();
    let cities: FormArray = new FormArray([]);
    let places: FormArray = new FormArray([]);
    let places_1: FormArray = new FormArray([]);
    let media: FormArray = new FormArray([]);
    
    // If we are creating a new trip add a city and a place by default
    if (!this.isEditing) {
      // Add a city
      cities.push(
        new FormGroup({
          id: new FormControl(),
          name: new FormControl('', Validators.required),
          country: new FormControl('', Validators.required),
          places: places
        })
      )
      // Add a Place
      places.push(
        new FormGroup({
          id: new FormControl(),
          name: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          review: new FormControl('', Validators.required),
          media: media
        })
      )
    }

    //NOTE: Don't remove this commented code for reference purposes
    /**
    // Add a Media
    // media.push(
    //   new FormGroup({
    //     id: new FormControl(),
    //     link: new FormControl('https://unsplash.it/300/300/?random', Validators.required),
    //     description: new FormControl('Enjoyed a lot', Validators.required)
    //   })
    // )
    // Add a Place
    // places.push(
    //   new FormGroup({
    //     id: new FormControl(),
    //     name: new FormControl('Koregaon park', Validators.required),
    //     description: new FormControl('We had really nice food here', Validators.required),
    //     review: new FormControl('Really lively place', Validators.required),
    //     media: media
    //   })
    // )

    // places_1.push(
    //   new FormGroup({
    //     id: new FormControl(),
    //     name: new FormControl('Koregaon park', Validators.required),
    //     description: new FormControl('We had really nice food here', Validators.required),
    //     review: new FormControl('Really lively place', Validators.required),
    //     //TODO: Refactor this change media to pictures as per rails dependency
    //     media: media
    //   })
    // )
    // Add a dummy City
    // cities.push(
    //   new FormGroup({
    //     id: new FormControl(),
    //     name: new FormControl('Pune city', Validators.required),
    //     country: new FormControl('India', Validators.required),
    //     places: places
    //   })
    // )
    **/

    this.tripForm = this.fb.group({
      id: [""],
      name: [name, Validators.required],
      description: [description, Validators.required],
      startDate: [startDate, Validators.required],
      endDate: [endDate, Validators.required],
      // status: [status, Validators.required] //TODO use a checkbox or a select box.
      cities: cities
    })
  }

  /**
   * Adds a city FormGroup to the cities <FormArray>FormControl(__cities__)
   * @method addCity
   * @param void
   * @return void
   */
  addCity(city?:City):void {
    let places = new FormArray([]);
    let passedCity: City;
    
    let id: String;
    let name: String; 
    let country: String;

    if (city) {
        id = city.id;
        name = city.name;
        country = city.country;
    } else {
        id = '';
        name = '';
        country = '';
    }
    (<FormArray>this.tripForm.controls['cities']).push(
      new FormGroup({
        id: new FormControl(id),
        name: new FormControl(name, Validators.required),
        country: new FormControl(country),
        places: places
      })
    )
  }

  /**
   * Adds a place FormGroup to the city's <FormArray>FormControl(__places__)
   * @method addPlace
   * @param {cityIndex} index of the city to which place is to be added
   * @return {void}
   */
  addPlace(cityIndex: number, place?: Place):void {
    let media: FormArray = new FormArray([]);
    let id: String;
    let description: String;
    let name: String;
    let review: String;
    if(place) {
      name = place.name;
      description = place.description;
      review = place.review;
      id = place.id;
    } else {
      name = ''; 
      description = ''; 
      review = ''; 
      id = '';
    }

    (<FormArray>(<FormGroup>(<FormArray>this.tripForm.controls['cities'])
      .controls[cityIndex]).controls['places']).push(
        new FormGroup({
          id: new FormControl(id),
          name: new FormControl(name, Validators.required),
          description: new FormControl(description, Validators.required),
          review: new FormControl(review),
          media: media
        })
    )
  }

  /**
   * Adds a new FormGroup to the places FormArray(FormControl)
   * @method addPicture
   * @param {cityIndex} the index of the city to whose place the picture is to be added
   * @param {placeIndex} the index of the place to which the picture is to be added
   * @return {void}
   */
  addPicture(cityIndex: number, placeIndex: number): void {
    // TODO: 
    // 1. First refactor media to pictures https://www.pivotaltracker.com/story/show/136716365
    // 2. Check addPlace method to see how it should be done with 1 more level of nesting
  }
}
