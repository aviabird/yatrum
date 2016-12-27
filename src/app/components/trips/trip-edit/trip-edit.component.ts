import { Form, FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'tr-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss']
})
export class TripEditComponent implements OnInit {
  tripForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  onSubmit(): void {
    console.log('submitting form', this.tripForm.value);
    // dispatch saving the form Action.
    // sets the new trip in store, use that to navigate to the 
    // trip detail page. 
    // Once the trip and created in the backend even once we show 
    // button for publishing the Trip
    // As user publishes the trip he is directly taken to his profile 
    // use an observable here.
  }

  initForm() {
    let name = 'Dubai Trip';
    let description = 'Desert safari';
    // let status = "completed"; //TODO use a checkbox or a select box.
    let startDate = Date.now();
    let endDate = Date.now();
    let cities: FormArray = new FormArray([]);
    let places: FormArray = new FormArray([]);
    let places_1: FormArray = new FormArray([]);
    let media: FormArray = new FormArray([]);
    
    // Add a Media
    media.push(
      new FormGroup({
        link: new FormControl('https://unsplash.it/300/300/?random', Validators.required),
        description: new FormControl('Enjoyed a lot', Validators.required)
      })
    )
    // Add a Place
    places.push(
      new FormGroup({
        name: new FormControl('Koregaon park', Validators.required),
        description: new FormControl('We had really nice food here', Validators.required),
        review: new FormControl('Really lively place', Validators.required),
        media: media
      })
    )

    places_1.push(
      new FormGroup({
        name: new FormControl('Koregaon park', Validators.required),
        description: new FormControl('We had really nice food here', Validators.required),
        review: new FormControl('Really lively place', Validators.required),
        media: media
      })
    )
    // Add a dummy City
    cities.push(
      new FormGroup({
        name: new FormControl('Pune city', Validators.required),    //[''],
        country: new FormControl('India', Validators.required), //[''],
        places: places   //['']
      })
    )
    cities.push(
      new FormGroup({
        name: new FormControl('Dubai city', Validators.required),    //[''],
        country: new FormControl('UAE', Validators.required), //[''],
        places: places_1   //['']
      })
    )

    this.tripForm = this.fb.group({
      name: [name, Validators.required],
      description: [description, Validators.required],
      startDate: [startDate, Validators.required],
      endDate: [endDate, Validators.required],
      // status: [status, Validators.required] //TODO use a checkbox or a select box.
      cities: cities
    })
  }

  addCity() {
    console.log('adding a new city');
  }

  addPlace(city) {
    console.log('adding a new place for city ', city);
  }

}
