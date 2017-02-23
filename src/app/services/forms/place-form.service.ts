import { FormBuilder, Validators } from '@angular/forms';
import { Place } from './../../models/place';
import { Injectable } from '@angular/core';


@Injectable()
export class PlaceFormService {

  constructor(private formBuilder: FormBuilder) { }

  initPlace(place?) {
    if (place) {
      return this.formBuilder.group({
        'id': [place.id],
        'name': [place.name, Validators.required],
        'review': [place.review, Validators.required],
        'pictures': this.formBuilder.array(place.pictures),
        'visited_date': [new Date(place.visited_date), Validators.required],
        '_destroy': [place._destroy]
      })

    }
    else {
      return this.formBuilder.group({
        'id': [''],
        'name': ['', Validators.required],
        'review': ['', Validators.required],
        'pictures': this.formBuilder.array([]),
        'visited_date': [new Date(), Validators.required],
        '_destroy': [false]
      })
    }

  }

}
