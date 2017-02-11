import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Adding Feed/Trending Trips
  // tripsType: Boolean;

  constructor() { }

  ngOnInit() {
  }

  selectTripsType(selectedTripsType: string) {
    // switch(selectedTripsType) {
    //   case "feeds":

    // }
  }

}
