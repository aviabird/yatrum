import { Trip } from './../../../models/trip';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {
  private subscription: Subscription;
  tripIndex: number;
  selectedTrip: Trip;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.tripIndex = params['id'];
        console.log("received index", this.tripIndex);
        // this.selectedTrip = this.tripService.getRecipe(this.tripIndex);
      }
    )
  }

  goBack() {
    this.router.navigate(["../"]);
  }

}
