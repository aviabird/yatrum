import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { UserProfile } from '../../../models/user-profile';
import { LikeTripAction } from '../../../actions/trips.action';


@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent {

  trip: any = {};
  user: any = {};

  constructor(private store: Store<fromRoot.State>) {
    this.store
      .select(fromRoot.getSelectedTrip)
      .subscribe(trip => {
        if (trip) {
          this.user = trip.user;
          this.trip = trip;
        }
      });
  }

  onToggleLike() {
    this.store.dispatch(new LikeTripAction(this.trip.id));
    this.trip.is_liked_by_current_user = !this.trip.is_liked_by_current_user;
  }

}
