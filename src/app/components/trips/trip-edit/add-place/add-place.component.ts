import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'tr-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  placeForm: FormGroup;
  @Output() newPlace: EventEmitter<Object> = new EventEmitter<Object>();
  @Input() place;


  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.placeForm = this.formBuilder.group({
      'name': [this.place.name, Validators.required],
      'description': [this.place.description, Validators.required],
      'review': [this.place.review, Validators.required],
      'pictures': this.formBuilder.array([])
    })

    let input = document.getElementById('place-search');
    let options = {
      types: ['establishment']
    };

    let autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      // console.log(place); 
    });
  }

  onSubmit() {
    console.log("my form", this.placeForm.value);
    this.newPlace.emit(this.placeForm.value);
  }

}
