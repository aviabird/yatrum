import { CloudinaryIntegrationService } from './../../../../services/cloudinary-integration.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'tr-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {


  public loaded: boolean = false;
  public imageSrc: string = '';
  placeForm: FormGroup;
  @Output() newPlace: EventEmitter<Object> = new EventEmitter<Object>();
  @Input() place;


  constructor(private formBuilder: FormBuilder, private cloudinaryService: CloudinaryIntegrationService) {
  }


  ngOnInit() {
    if(this.place) {
      this.placeForm = this.formBuilder.group({
        'id': [this.place.id, Validators.required],
        'name': [this.place.name, Validators.required],
        'review': [this.place.review, Validators.required],
        'pictures': this.formBuilder.array(this.place.pictures)
      })
    }
    else {
      this.placeForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'review': ['', Validators.required],
        'pictures': this.formBuilder.array([])
      })
    }

  }


  handleInputChange(e) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let pattern = /image-*/;
    let reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
    
  private handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    this.onAddPhoto();    
  }

  onAddPhoto() {
    this.cloudinaryService.uploadPlacePicture(this.imageSrc)
      .subscribe(data => {
        (<FormArray>this.placeForm.controls['pictures']).push(
          this.formBuilder.group({
            'url': [data.url, Validators.required],
            'description': ['Describe Picture'],
            'public_id': [data.public_id, Validators.required]
          })
        )
      })
  }

  onSubmit() {
    this.newPlace.emit(this.placeForm.value);
    if(!this.place) {
      this.placeForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'review': ['', Validators.required],
        'pictures': this.formBuilder.array([])
      })
    }
  }

  focusFunction($event) {
    let input = $($event.target)[0]; 
    let options = {
      types: ['establishment']
    };
    let autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
    });
  }

}
