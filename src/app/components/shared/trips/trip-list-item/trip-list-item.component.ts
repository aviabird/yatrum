import { Trip } from './../../../../models/trip';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tr-trip-list-item',
  templateUrl: './trip-list-item.component.html',
  styleUrls: ['./trip-list-item.component.scss']
})
export class TripListItemComponent implements OnInit {
  @Input() trip: Trip;

  constructor() { }

  ngOnInit() {
  }

}
