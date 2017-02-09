import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tr-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss']
})
export class PlaceDetailComponent implements OnInit {

  @Input() place;

  constructor() { }

  ngOnInit() {
  }

}
