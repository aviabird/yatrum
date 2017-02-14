import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TripsService } from '../../services/trips.service';
import * as fromRoot from './../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Trip } from '../../models/trip';
import { getTrendingTrips, getFeedTrips } from '../../reducers/index';
import { LoadFeedTripsAction, LoadTrendingTripsAction } from '../../actions/trips.action';

@Component({
  selector: 'tr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Adding Feed/Trending Trips
  tripsType: String = "feeds";
  trips$: Observable<Trip[]>;
  hideLoader: boolean = false;

  constructor(private store: Store<fromRoot.State>, private tripService: TripsService) {
    this.trips$ =
      this.store.select(fromRoot.getFeedTrips).do(
        trips => { trips.length ? this.hideLoader = true : this.hideLoader = false }
      );
  }

  ngOnInit() {
  }

  isFeedType() {
    return this.tripsType == "feeds"
  }

  isTrendingType() {
    return this.tripsType == "trending"
  }

  selectTripsType(selectedTripsType: string) {
    if (selectedTripsType == this.tripsType) { return }

    switch (selectedTripsType) {
      case "feeds":
        this.tripsType = "feeds";
        this.trips$ =
          this.store.select(fromRoot.getFeedTrips).do(
            trips => { trips.length ? this.hideLoader = true : this.hideLoader = false }
          );
        this.store.dispatch(new LoadFeedTripsAction({page: 1, tripsType: this.tripsType}));
        break;
      case "trending":
        this.tripsType = "trending";
        this.trips$ =
          this.store.select(fromRoot.getTrendingTrips).do(
            trips => { trips.length ? this.hideLoader = true : this.hideLoader = false }
          );
        this.store.dispatch(new LoadTrendingTripsAction({page: 1, tripsType: this.tripsType}));
        break;
    }
  }

}
