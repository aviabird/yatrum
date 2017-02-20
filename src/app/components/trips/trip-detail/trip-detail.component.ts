import { Subscription } from 'rxjs/Rx';
import { UserAuthService } from './../../../services/user-auth.service';
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
  trip$: Observable<any>;
  loggedInUser$: Observable<UserProfile>;
  trip: Trip = new Trip();
  comments$: Observable<Comment[]>;
  userTrip: boolean;
  user: UserProfile = new UserProfile();
  tripSubs: Subscription;
  loggedSubs: Subscription;

  constructor(private store: Store<fromRoot.State>, private authService: UserAuthService) {
    this.trip.user = this.user;
    this.trip$ = this.store.select(fromRoot.getSelectedTrip);
    this.comments$ = this.store.select(fromRoot.getSelectedTripComments);
    this.loggedInUser$ = this.store.select(fromRoot.getUserProfile);
  }

  ngOnInit() {
    this.tripSubs = this.trip$.subscribe(trip => {
      if (trip) {
        this.trip = trip;
        this.user = trip.user;
        this.store.dispatch(new LoadCommentsAction(trip.id));
      }
    });
    
    this.loggedSubs = this.loggedInUser$.subscribe(user => {
      if (user.id === this.trip.user.id) {
        this.userTrip = true;
      } else {
        this.userTrip = false;
      }
    })
  }

  tripFollowState() {
    return this.trip.user.is_followed_by_current_user ? 'active' : 'inactive';
  }

  tripLikeState() {
    return this.trip.is_liked_by_current_user ? 'active' : 'inactive';
  }

  onToggleFollow() {
    this.store.dispatch(new FollowUserAction(this.trip.user_id))
  }  

  onToggleLike() {
    this.store.dispatch(new LikeTripAction(this.trip.id));
    // this.trip.is_liked_by_current_user = !this.trip.is_liked_by_current_user;
  }

  belongsToLoggedInUser() {
    return this.authService.belongsToLoggedInUser(this.trip.user_id)
  }

  formatImageUrl(rawUrl) {
    if(!rawUrl) return;

    let sizeFormatString = '/c_limit,q_65,w_900';
    let splitUrlArray = rawUrl.split('/upload')
    let firstPart = splitUrlArray[0] + '/upload';
    let seconPart = sizeFormatString + splitUrlArray[1];
    return `${firstPart}${seconPart}`;
  }

  ngOnDestroy() {
    this.tripSubs.unsubscribe();
    this.loggedSubs.unsubscribe();
  }

}
