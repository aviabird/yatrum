import { TripsService } from './../../../services/trips.service';
import { Subscription } from 'rxjs/Rx';
import { FollowUserAction } from './../../../actions/user.action';
import { LikeTripAction } from './../../../actions/trips.action';
import { Trip } from './../../../models/trip';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from '../../../models/comment';
import { LoadCommentsAction } from '../../../actions/comment.action';
import { UserProfile } from '../../../models/user-profile';

@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripDetailComponent implements OnInit, OnDestroy {
  trip$: Observable<Trip>;
  tripUser = new UserProfile();
  loggedInUser$: Observable<UserProfile>;
  comments$: Observable<Comment[]>;
  routeSubs: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private tripService: TripsService) {
    this.trip$ =
      this.store.select(fromRoot.getSelectedTrip)
      .do(trip => {
        if(trip) {
          this.store.dispatch(new LoadCommentsAction(trip.id));
          this.tripUser = trip.user
        }
      });

    this.comments$ = this.store.select(fromRoot.getSelectedTripComments);
    this.loggedInUser$ = this.store.select(fromRoot.getUserProfile);

    this.tripService.increase_view_count()

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
