import { ServerAuthService } from './../../../services/server-auth.service';
import { Observable } from 'rxjs/Observable';
import { LikeTripAction } from './../../../actions/trips.action';
import { FollowUserAction } from './../../../actions/user.action';
import { Trip } from './../../../models/trip';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { SearchTrip, LoadFeedTripsAction } from '../../../actions/trips.action';
import { UserProfile } from '../../../models/user-profile';
import { ChangeDetectionStrategy } from '@angular/core';
import {
  Component, OnInit, trigger, state,
  style, animate, Input, transition,
} from '@angular/core';

@Component({
  selector: 'tr-trip-list-item',
  templateUrl: './trip-list-item.component.html',
  styleUrls: ['./trip-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInUp', [
      state('in', style({ transform: "translateY(0)" })),
      transition('void => *', [
        style({ transform: "translateY(100%)" }),
        animate(500)
      ])
    ]),
    trigger('toggleLike', [
      state('inactive', style({})),
      state('active', style({
        color: 'rgba(255, 5, 5, 0.6)',
        opacity: 1,
        transform: "scale(1.0)"
      })),
      transition('inactive => active', [
        style({ transform: "scale(3.0)", opacity: 0, color: '#E78B90' }),
        animate(500)
      ]),
      transition('active => inactive', animate(500))
    ])
  ]
})
export class TripListItemComponent implements OnInit {
  @Input() trip: Trip;
  @Input() isFollowable: boolean = false;
  @Input() isEditable: boolean = false;
  loggedInUser$: Observable<UserProfile>;
  userTrip: boolean;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private authService: ServerAuthService
  ) {
    this.loggedInUser$ = this.store.select(fromRoot.getUserProfile);
  }

  ngOnInit() {
    // this.loggedInUser$.subscribe(user => this.userTrip = this.tripOfAuthUser(user));
  }

  tripLikeState() {
    return this.trip.is_liked_by_current_user ? 'active' : 'inactive';
  }

  tripFollowState() {
    return this.trip.user.is_followed_by_current_user ? 'active' : 'inactive';
  }

  /**
   * returns true if the user is owner of the trip
   * {user} Auth user object
   */
  // tripOfAuthUser(user) {
  //   return user.id === this.trip.user.id ? true : false;
  // }

  toggleLike() {
    this.trip.is_liked_by_current_user = !this.trip.is_liked_by_current_user
    setTimeout(() => { this.store.dispatch(new LikeTripAction(this.trip.id)) }, 500)
  }

  toggleFollowBtn() {
    this.store.dispatch(new FollowUserAction(this.trip.user_id))
  }

  onTagClick(searchQuery) {
    this.router.navigate(['/search']);
    this.store.dispatch(new SearchTrip(searchQuery))
  }

  belongsToLoggedInUser() {
    return this.authService.belongsToLoggedInUser(this.trip.user_id)
  }

}
