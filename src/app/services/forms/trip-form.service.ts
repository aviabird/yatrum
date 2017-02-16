import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class TripFormService {

  constructor(private formBuilder: FormBuilder) { }

  initTrip(trip?) {
    let id,description,name;

    if(trip) {
      id = trip.id;
      description = trip.description;
      name = trip.name;
    }
    else {
      id = '';
      description = '';
      name = '';
    }
    
    return this.formBuilder.group({
      'id': [id, Validators.required],
      'description': [description],
      'name': [name, Validators.required],
      'places': this.formBuilder.array([], Validators.required) 
    }) 
    
  }

}
