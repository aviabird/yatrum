import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class TripFormService {

  constructor(private formBuilder: FormBuilder) { }

  initTrip(trip?) {
    let id,description,name, tags;

    if(trip) {
      id = trip.id;
      description = trip.description;
      name = trip.name;
      tags = trip.tag_list;
    }
    else {
      id = '';
      description = '';
      name = '';
      tags = [];
    }
    
    return this.formBuilder.group({
      'id': [id],
      'description': [description],
      'name': [name, Validators.required],
      'places': this.formBuilder.array([], Validators.required),
      'tag_list': this.formBuilder.array(tags)
    }) 
    
  }

}
