import { PlaceFormService } from './../../../../services/forms/place-form.service';
import { ToastyService } from 'ng2-toasty';
import { CloudinaryIntegrationService } from './../../../../services/cloudinary-integration.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

declare var $: any;
declare var google: any;

@Component({
  selector: 'tr-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  placeForm: FormGroup;
  @Output() newPlace: EventEmitter<Object> = new EventEmitter<Object>();
  @Input() place;
  googleSuggestedPlaceName: string = null;
  datePickerDate: Date;


  constructor(
    private formBuilder: FormBuilder,
    private cloudinaryService: CloudinaryIntegrationService,
    private toastyService: ToastyService,
    private placeFormService: PlaceFormService) {
    
  }

  ngOnInit() {
    this.initForm();
  }

  imageUploaded(image) {
    (<FormArray>this.placeForm.controls['pictures']).push(
      this.formBuilder.group(image))
  }

  removeImage(picture, index) {
    (<FormGroup>(<FormArray>this.placeForm.controls['pictures']).controls[index]).setValue({
      id: picture.id,
      description: picture.description,
      url: picture.url,
      public_id: picture.public_id,
      '_destroy': true
    });
  }

  onSubmit() {
    if(!this.placeForm.valid) {
      this.toastyService.warning({ title: "Invalid Place", msg: "Place must contain Name, Review and Date" });
      return;
    }
    let place = this.placeForm.value;
    if (this.googleSuggestedPlaceName)
      place.name = this.googleSuggestedPlaceName;
    this.newPlace.emit(place);

    this.placeForm.controls['name'].setValue('');
    this.placeForm.controls['review'].setValue('');
    this.placeForm.controls['visited_date'].setValue('');
    let empty = this.formBuilder.array([]);
    this.placeForm.setControl('pictures', empty);
    this.placeForm.controls['_destroy'].setValue(false);
  }

  focusFunction($event) {
    let input = $($event.target)[0];
    let options = {
      types: ['establishment']
    };
    let autocomplete = new google.maps.places.Autocomplete(input);
    let that = this;
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      let place = autocomplete.getPlace();
      that.googleSuggestedPlaceName = place.name;
    });
  }

  private initForm() {
    if (this.place) {
      this.placeForm = this.placeFormService.initForm(this.place);
    }
    else {
      this.placeForm = this.placeFormService.initForm();
    }
  }

}
