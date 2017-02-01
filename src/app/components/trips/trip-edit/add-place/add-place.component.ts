import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  placeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.placeForm = formBuilder.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'images': formBuilder.array([{
        'url': [''],
        'description': ['']
      }])
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("my form", this.placeForm);
  }

}
