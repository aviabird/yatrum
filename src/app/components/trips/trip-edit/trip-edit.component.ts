import { Subscription } from 'rxjs/Rx';
import { SaveTripAction, UpdateTripAction } from './../../../actions/trips.action';
import { State } from './../../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'tr-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss']
})

export class TripEditComponent implements OnInit {
  private subscription: Subscription;
  trip$: Observable<any>;
  trip;
  tripForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private route: Router) {
    this.trip$ = this.store.select(fromRoot.getSelectedTrip);
    this.trip$.subscribe(trip => this.trip = trip);
    this.tripForm = this.initForm();
    this.addCity();
    if(this.trip)
      this.addTripPlaces();  
  }

  ngOnInit() {
  }

  private initForm() {
    if(this.trip){
      return this.formBuilder.group({
        'name': [this.trip.name,Validators.required],
        'description': [this.trip.description, Validators.required],
        'cities': this.formBuilder.array([])        
      });
    }
    else
    {
      return this.formBuilder.group({
        'name': ['',Validators.required],
        'description': ['', Validators.required],
        'cities': this.formBuilder.array([]) 
      })
    }
  }

  private addTripPlaces() {
    for(let place of this.trip.cities[0].places) {
      this.addNewPlace({
        name: place.name,
        description: place.description,
        review: place.review
      })
    }
  }

  addNewPlace(event) {
    (<FormArray>(<FormGroup>(<FormArray>this.tripForm.controls['cities'])
      .controls[0]).controls['places']).push(
        this.formBuilder.group(event)
      );
  }

  addCity() {
    (<FormArray>this.tripForm.controls['cities']).push(
      this.formBuilder.group({
        'name': ['Pune'],
        'country': ['India'],
        'places': this.formBuilder.array([])
      })
    )
  }

  emptyPlace() {
   let place = {
      name: '',
      description: '',
      review: ''
    }
    return place;
  }

  onSubmit() {
    if(this.trip){
      this.tripForm.value['id'] = this.trip.id;
      this.store.dispatch(new UpdateTripAction(this.tripForm.value));
    }
    else
      this.store.dispatch(new SaveTripAction(this.tripForm.value));
  }

}





// import { Picture } from './../../../models/picture';
// import { Place } from './../../../models/place';
// import { City } from './../../../models/city';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Trip } from './../../../models/trip';
// import { Observable } from 'rxjs/Observable';
// import { Store } from '@ngrx/store';
// import { createSelector } from 'reselect';
// import { Component, OnInit, EventEmitter } from '@angular/core';
// import * as fromRoot from '../../../reducers';

// import { 
//   SaveTripAction, UpdateTripAction, ClearEditingTripAction, 
//   AddTripToLocalStore, LoadTripsAction, SelectTripAction 
// } from './../../../actions/trips.action';
// import { 
//   Form, FormGroup, FormBuilder, FormArray, 
//   Validators, FormControl 
// } from '@angular/forms';

// @Component({
//   selector: 'tr-trip-edit',
//   templateUrl: './trip-edit.component.html',
//   styleUrls: ['./trip-edit.component.scss']
// })
// export class TripEditComponent implements OnInit {
//   tripForm: FormGroup;
//   editingStatus$: Observable<boolean>;
//   isEditing: boolean; // calling create/update service methods
//   isNewTrip: boolean = true; // editing/creating a trip
//   trip$: Observable<Trip>;
//   tripId: string;
//   getSelectedTrip$: Observable<Trip>;

//   cities: FormArray = new FormArray([]);
//   places: FormArray = new FormArray([]);
//   media: FormArray = new FormArray([]);
//   pictures: FormArray = new FormArray([]);

//   constructor(private fb: FormBuilder, 
//               private store: Store<fromRoot.State>,
//               private router: Router,
//               private activatedRoute: ActivatedRoute) { 
//     this.redirectUponCreate();
//   }

//   ngOnInit() {
//     this.setEditingTripIntialise();    
//   }

//   /** 
//    * sets the editing status
//    */
//   setEditingTripIntialise() {
//     if (this.idPresentInParams()) {
//       this.isEditing = true;
//       this.getSelectedTrip$ = this.store.select(fromRoot.getSelectedTrip);
//       this.getSelectedTrip$.subscribe((trip) => {
//         this.initForm(trip);
//         this.tripId = trip.id;
//       })
//     } else {
//       this.initForm();
//       this.isEditing = false;
//     }
//   }

//   /**
//    * helper method returns true if id is present in params
//    */
//   idPresentInParams(){
//     return 'id' in this.activatedRoute.snapshot.params
//   }

//   /**
//    * 1. Redirect after successful trip creation
//    * 2. Clear editingTrip from store
//    * 3. Add the created to local trip store
//    * @method redirectUponCreate
//    */
//   redirectUponCreate() {
//     this.trip$ = this.store.select(fromRoot.getEditingTrip);
    
//     this.trip$.subscribe((trip) => {
//       if (trip && trip.hasOwnProperty('id')){
//         this.tripId = trip.id;
//         this.store.dispatch(new AddTripToLocalStore(trip));
//         this.router.navigateByUrl(`/trips/${this.tripId}`);
//         this.store.dispatch(new ClearEditingTripAction());
//       }
//     })
//   }

//   redirectUponUpdate() {    
//     this.store.dispatch(new SelectTripAction(this.tripId));
//     this.router.navigateByUrl(`/trips/${this.tripId}`);
//   }
  
//   /**
//    * Set the create form with latest data trip from the backend updates ids
//    * @method setFormDataWithStoreTrip
//    * @param {Trip} trip from the store
//    * @return void
//    * 
//    * @unstable
//    */
//   resetFormDataWithStoreTrip(trip: Trip):void {
//     // patchValue It doesn't work the way we want it
//     // Mimicking its behavious using setValue.
//     // this.tripForm.patchValue(trip); 
//     this.tripForm.controls['id'].setValue(trip.id);
//     this.tripForm.controls['name'].setValue(trip.name);
//     this.tripForm.controls['description'].setValue(trip.description);

//     trip.cities.forEach((city, cityIndex) => {
//       this.addCity(city);
//       city.places.forEach((place, placeIndex) =>{
//         this.addPlace(cityIndex, place);
//         //NOTE: Pictures should be assigned here
//         place.pictures.forEach(picture => {
//           this.addPicture(cityIndex, placeIndex, picture);
//         })
//       })
//     })
//   }

//   /**
//    * redirect user back
//    * @method onCancel
//    */
//   onCancel() {
//     console.log('Cancel button clicked');
//     // redirect to back
//   }

//   /**
//    * Sends update and create method requests to the api
//    * @method onSubmit
//    */
//   onSubmit() {
//     // Set the editing trip everytime we get a success response from the 
//     // create success action and if the editing trip has some value(id) 
//     // or something then we send an update trip request.
//     if( this.tripForm.valid ) {
//       console.log('form is valid');
//       if( this.isEditing === false ) {
//         this.store.dispatch(new SaveTripAction(this.tripForm.value));
//       } else {
//         this.store.dispatch(new UpdateTripAction(this.tripForm.value));
//         this.redirectUponUpdate();
//       }
//     } else {
//       console.log('form is invalid ', this.tripForm);
//     }
//   }

//   /**
//    * Initialises the tripForm 
//    * @method initForm
//    */
//   initForm(trip?:Trip):void {
//     let name = 'Trip';
//     let description = 'Desert safari';
//     // let status = "completed"; //TODO use a checkbox or a select box.
//     let startDate = Date.now();
//     let endDate = Date.now();
//     let cities: FormArray = new FormArray([]);
//     let places: FormArray = new FormArray([]);
//     let pictures: FormArray = new FormArray([]);

//     this.tripForm = this.fb.group({
//       id: [""],
//       name: [name, Validators.required],
//       description: [description, Validators.required],
//       startDate: [startDate, Validators.required],
//       endDate: [endDate, Validators.required],
//       // status: [status, Validators.required] //TODO use a checkbox or a select box.
//       cities: this.cities
//     })
//     // If we are creating a new trip add a city and a place by default
//     if(trip) {
//       this.resetFormDataWithStoreTrip(trip);
//     } else {
//       this.provisionCityAndPlace();      
//     }
//   }

//   /**
//    * Add an empty city and place for a new trip
//    * @method provisionCityAndPlace
//    */
//   provisionCityAndPlace() {
//     if (!this.isEditing) {
//       // Add a city
//       this.cities.push(
//         //TODO: Refactor extract this creation of formGroup
//         new FormGroup({
//           id: new FormControl(),
//           name: new FormControl('', Validators.required),
//           country: new FormControl(''),
//           places: this.places
//         })
//       )
//       // Add a Place
//       this.places.push(
//         //TODO: Refactor extract this creation of formGroup        
//         new FormGroup({
//           id: new FormControl(),
//           name: new FormControl('', Validators.required),
//           description: new FormControl('', Validators.required),
//           review: new FormControl(''),
//           pictures: this.pictures
//         })
//       )
//     }
//   }

//   /** 
//    * Update image for a place
//    */
//   imageUploaded(imageData: any) {
//     let placeIndex = imageData.placeIndex;
//     let cityIndex = imageData.cityIndex;
//     this.addPicture(cityIndex, placeIndex, imageData.picture);
//   }


  // /**
  //  * Adds a city FormGroup to the cities <FormArray>FormControl(__cities__)
  //  * @method addCity
  //  * @param void
  //  * @return void
  //  */
  // addCity(city?:City):void {
  //   let places = new FormArray([]);
  //   let passedCity: City;
    
  //   let id: String;
  //   let name: String; 
  //   let country: String;

  //   if (city) {
  //       id = city.id;
  //       name = city.name;
  //       country = city.country;
  //   } else {
  //       id = '';
  //       name = '';
  //       country = '';
  //   }
  //   (<FormArray>this.tripForm.controls['cities']).push(
  //     //TODO: Refactor extract this creation of formGroup      
  //     new FormGroup({
  //       id: new FormControl(id),
  //       name: new FormControl(name, Validators.required),
  //       country: new FormControl(country),
  //       places: places
  //     })
  //   )
  // }

//   /**
//    * Adds a place FormGroup to the city's <FormArray>FormControl(__places__)
//    * @method addPlace
//    * @param {cityIndex} index of the city to which place is to be added
//    * @return {void}
//    */
//   addPlace(cityIndex: number, place?: Place):void {
//     let pictures: FormArray = new FormArray([]);
//     let id: String;
//     let description: String;
//     let name: String;
//     let review: String;
//     if(place) {
//       name = place.name;
//       description = place.description;
//       review = place.review;
//       id = place.id;
//     } else {
//       name = ''; 
//       description = ''; 
//       review = ''; 
//       id = '';
//     }

//     (<FormArray>(<FormGroup>(<FormArray>this.tripForm.controls['cities'])
//       .controls[cityIndex]).controls['places']).push(
//         //TODO: Refactor extract this creation of formGroup        
//         new FormGroup({
//           id: new FormControl(id),
//           name: new FormControl(name, Validators.required),
//           description: new FormControl(description, Validators.required),
//           review: new FormControl(review),
//           pictures: pictures
//         })
//     )
//   }

//   /**
//    * Adds a new FormGroup to the places FormArray(FormControl)
//    * @method addPicture
//    * @param {cityIndex} the index of the city to whose place the picture is to be added
//    * @param {placeIndex} the index of the place to which the picture is to be added
//    * @param {picture} Picture object to be added to the Place.
//    * @return {void}
//    */
//   addPicture(cityIndex: number, placeIndex: number, picture: Picture): void {
//     let id:string = picture.id;
//     let description:string = picture.description;
//     let url:string = picture.url;
//     let public_id:string = picture.public_id;
    
//     // Create and add the FormControl for picture in place
//     (<FormArray>(<FormGroup>
//       (<FormArray>(<FormGroup>
//         (<FormArray>this.tripForm.controls['cities'])
//           .controls[cityIndex]).controls['places'])
//           .controls[placeIndex]).controls['pictures']).push(
//             new FormGroup({
//               id: new FormControl(id),
//               description: new FormControl(description),
//               url: new FormControl(url),
//               public_id: new FormControl(public_id)
//             })
//           )
//   }
// }

// /**
//  * //NOTE: Don't remove this commented code for reference purposes
//  * This is how we can have a dummy trip while creating the form
//     /**
//     // Add a Media
//     // media.push(
//     //   new FormGroup({
//     //     id: new FormControl(),
//     //     link: new FormControl('https://unsplash.it/300/300/?random', Validators.required),
//     //     description: new FormControl('Enjoyed a lot', Validators.required)
//     //   })
//     // )
//     // Add a Place
//     // places.push(
//     //   new FormGroup({
//     //     id: new FormControl(),
//     //     name: new FormControl('Koregaon park', Validators.required),
//     //     description: new FormControl('We had really nice food here', Validators.required),
//     //     review: new FormControl('Really lively place', Validators.required),
//     //     media: media
//     //   })
//     // )

//     // places_1.push(
//     //   new FormGroup({
//     //     id: new FormControl(),
//     //     name: new FormControl('Koregaon park', Validators.required),
//     //     description: new FormControl('We had really nice food here', Validators.required),
//     //     review: new FormControl('Really lively place', Validators.required),
//     //     //TODO: Refactor this change media to pictures as per rails dependency
//     //     media: media
//     //   })
//     // )
//     // Add a dummy City
//     // cities.push(
//     //   new FormGroup({
//     //     id: new FormControl(),
//     //     name: new FormControl('Pune city', Validators.required),
//     //     country: new FormControl('India', Validators.required),
//     //     places: places
//     //   })
//     // )
//     **/
