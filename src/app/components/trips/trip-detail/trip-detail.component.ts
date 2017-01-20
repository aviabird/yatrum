import { Trip } from './../../../models/trip';
import { UserProfile } from './../../../models/user-profile';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'], 
})
export class TripDetailComponent implements OnInit {
  trip$: Observable<any>;
  loggedInUser$: Observable<UserProfile>;
  trip: Trip;
  userTrip: boolean;

  constructor(private store: Store<fromRoot.State>) {
    this.trip$ = this.store.select(fromRoot.getSelectedTrip);
    this.loggedInUser$ = this.store.select(fromRoot.getUserProfile);
  }

  ngOnInit() {
    this.trip$.subscribe(trip => this.trip = trip);
    this.loggedInUser$.subscribe(user => {
      console.log('user profile', user);
      console.log('trip', this.trip);
      if (user.id === this.trip.user.id) {
        this.userTrip = true;
      } else {
        this.userTrip = false;
      }
    })
  }

}
