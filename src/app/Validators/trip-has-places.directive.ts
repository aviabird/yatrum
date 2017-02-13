import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

// implement this function for checking validation on trip places

function checkIfTripHasPlaces() {
  return (c: FormControl) => {
    let places = c.value;
    
    places.forEach(place => {
      if(place._destroy == false)
        return null;
    })
    
    return {
      validatePlaces: "Trip must contain at least one place"
    };
  }
}

@Directive({
  selector: '[hasPlaces][ngModel],[hasPlaces][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TripHasPlaces), multi: true }
  ]
})

export class TripHasPlaces {

  validator: Function;

  constructor() {
    this.validator = checkIfTripHasPlaces(); 
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
