import { TripsService } from './../../services/trips.service';
import { Media } from './../../models/media';
import { Place } from './../../models/place';
import { Component, OnInit } from '@angular/core';

import { Trip } from './../../models/trip';

@Component({
  selector: 'tr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trips: Trip[]

  constructor(private tripService: TripsService) { }

  ngOnInit() {
   this.trips = this.tripService.trips;
  }
}
