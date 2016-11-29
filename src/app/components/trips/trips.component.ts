import { Trip } from './../../models/trip';
import { TripsService } from './../../services/trips.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  trips: Trip[];

  constructor(private tripsService: TripsService) { }

  ngOnInit() {
    this.trips = this.tripsService.trips;
  }

}
