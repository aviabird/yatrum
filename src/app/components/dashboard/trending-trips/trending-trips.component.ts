import { getTrendingTrips, State } from './../../../reducers/index';
import { LoadMoreTripsAction, LoadTrendingTripsAction } from './../../../actions/trips.action';
import { TripsService } from './../../../services/trips.service';
import { Store } from '@ngrx/store';
import { Trip } from './../../../models/trip';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-trending-trips',
  templateUrl: './trending-trips.component.html',
  styleUrls: ['./trending-trips.component.scss']
})
export class TrendingTripsComponent implements OnInit {

  trendingTrips$: Observable<Trip[]>;
  private page: number = 1;

  constructor(private store: Store<State>, private tripService: TripsService) {
    this.trendingTrips$ = this.store.select(getTrendingTrips);
    this.trendingTrips$.subscribe((trips) => {
      console.log("trips", trips);
    })
  }

  ngOnInit() {
    this.store.dispatch(new LoadTrendingTripsAction({page: 1, tripsType: "feeds"}));
  }

  onScroll() {
    this.page++;
    let total_pages = this.tripService.total_pages;
    if(this.page <=  total_pages)
      this.store.dispatch(new LoadMoreTripsAction({page: this.page, tripsType: "feeds"}));
  }

}
