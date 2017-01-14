import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Trip } from './../../../models/trip';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers/index';
import { LoadTripsAction } from './../../../actions/trips.action';

@Component({
  selector: 'tr-dashboard-trips',
  templateUrl: './dashboard-trips.component.html',
  styleUrls: ['./dashboard-trips.component.scss']
})
export class DashboardTripsComponent implements OnInit {
  trips$: Observable<Trip[]>;
  authentication$: Observable<boolean>;
  hideLoader: boolean = false;

  constructor(private store: Store<fromRoot.State>) {
    this.trips$ =
      this.store.select(fromRoot.getTripsCollection).do(
        trips => { trips.length ? this.hideLoader = true : null }
      );

    this.authentication$ = this.store.select(fromRoot.getAuthStatus);
  }

  ngOnInit() {
  }

}
