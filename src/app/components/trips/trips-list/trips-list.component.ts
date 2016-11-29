import { TripsService } from './../../../services/trips.service';
import { Trip } from './../../../models/trip';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit {

  trips: Trip[];

  constructor(private tripsService: TripsService) { }

  ngOnInit() {
    this.trips = this.tripsService.trips;
  }

}
