import { Observable } from 'rxjs/Observable';
import { LikeTripAction } from './../../../../actions/trips.action';
import { Trip } from './../../../../models/trip';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import { SearchTrip, LoadTripsAction } from '../../../../actions/trips.action';
import { UserProfile } from '../../../../models/user-profile';
import { UserAuthService } from '../../../../services/user-auth.service';
import {
  Component, OnInit, trigger, state,
  style, animate, Input, transition,
} from '@angular/core';

@Component({
  selector: 'tr-trip-list-item',
  templateUrl: './trip-list-item.component.html',
  styleUrls: ['./trip-list-item.component.scss'],
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
        style({ transform: "scale(3.0)", opacity: 0, color: 'red' }),
        animate(500)
      ]),
      transition('active => inactive', animate(500))
    ])
  ]
})
export class TripListItemComponent implements OnInit {
  @Input() trip: Trip;
  state: any = {'like': 'inactive', 'follow': 'inactive'};
  loggedInUser$: Observable<UserProfile>;
  userTrip: boolean;
  tripMainPictureUrl: string;
  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private authService: UserAuthService
  ) {
    this.loggedInUser$ = this.store.select(fromRoot.getUserProfile);    
   }

  ngOnInit() {
    this.loggedInUser$.subscribe(user => this.userTrip = this.tripOfAuthUser(user));
    this.tripMainPicture();
    this.state.like = (this.trip.is_liked_by_current_user ? 'active' : 'inactive');
  }

  /**
   * returns true if the user is owner of the trip
   * {user} Auth user object
   */
  tripOfAuthUser(user) {
    return user.id === this.trip.user.id ? true : false;
  }

  // TODO: Refactor this later
  tripMainPicture(){
    if (this.trip.places[0].pictures.length > 0) {
      this.tripMainPictureUrl = this.trip.places[0].pictures[0].url; 
    } else {
      this.tripMainPictureUrl = "http://res.cloudinary.com/zeus999/image/upload/h_300/v1483437708/sea-sky-beach-holiday-11_nnbuey.jpg";
    }
  }

  toggleLike(status) {
    this.store.dispatch(new LikeTripAction(this.trip.id))
    this.state.like = (status === 'inactive' ? 'active' : 'inactive');
  }

  toggleFollowBtn(status) {
    this.state.follow = (status === 'inactive' ? 'active' : 'inactive');
  }

  onTagClick(searchQuery) {
    this.router.navigate(['/search']);
    
    if(searchQuery != "")
      this.store.dispatch(new SearchTrip(searchQuery))
    else
      this.store.dispatch(new LoadTripsAction({page: 1}))
  }

  belongsToLoggedInUser() {
    return this.authService.belongsToLoggedInUser(this.trip.user_id)
  }

}
