import { Place } from './../../../../models/place';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tr-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() placeIndex: number;
  @Input() cityIndex: number;
  @Output() imageData = new EventEmitter();

  place: Place;

  constructor() { }

  ngOnInit() {
  }

  handleOnChange(event) {
    let files = event.target.files;
    this.imageData.emit({
      placeIndex: this.placeIndex, 
      cityIndex: this.cityIndex, 
      pictures: [{ 
         id: '',
         url: 'https://unsplash.it/200/300?image=0',
         description: 'good thing',
         review: 'not such a good place'
      }, {
        id: '',
        url: 'https://unsplash.it/200/300?image=1',
        description: 'not so bad',
        review: 'not such a good place'
      }]
    });
  }

}
