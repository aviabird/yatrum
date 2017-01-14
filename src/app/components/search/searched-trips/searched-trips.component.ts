import { Store } from '@ngrx/store';
import { Trip } from './../../../models/trip';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from './../../../reducers/index';


@Component({
  selector: 'tr-searched-trips',
  templateUrl: './searched-trips.component.html',
  styleUrls: ['./searched-trips.component.scss']
})
export class SearchedTripsComponent implements OnInit {
  trips$: Observable<Trip[]>;
	authentication$: Observable<boolean>;
  hideLoader: boolean = false;

  constructor(private store: Store<fromRoot.State>) {
    this.trips$ = this.store.select(fromRoot.getTripsCollection).do(
        trips => { trips.length ? this.hideLoader = true : null }
      );
    this.authentication$ = this.store.select(fromRoot.getAuthStatus);
  }

  ngOnInit() {
  }
}
