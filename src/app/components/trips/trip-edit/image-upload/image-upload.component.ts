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

  constructor() { }

  ngOnInit() {
  }

  handleOnChange(event) {
    let files = event.target.files;
    this.imageData.emit({placeIndex: this.placeIndex, cityIndex: this.cityIndex, imageUrl: 'https://unsplash.it/575x515'});
  }

}
