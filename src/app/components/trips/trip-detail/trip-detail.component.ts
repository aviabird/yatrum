import { ServerAuthService } from './../../../services/server-auth.service';
import { environment } from './../../../../environments/environment';
import { Subscription } from 'rxjs/Subscription';
import { FollowUserAction } from './../../../actions/user.action';
import { LikeTripAction, IncreaseViewCountAction } from './../../../actions/trips.action';
import { Trip } from './../../../models/trip';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from '../../../models/comment';
import { LoadCommentsAction } from '../../../actions/comment.action';
import { UserProfile } from '../../../models/user-profile';
import { Ng2Cable } from 'ng2-cable/js/index';

// For BroadCasting new Comments to CommentsChannel
import { Broadcaster } from 'ng2-cable/js/index';

@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripDetailComponent implements OnInit, OnDestroy {
  trip$: Observable<Trip>;
  trip: Trip;
  tripUser = new UserProfile();
  loggedInUser$: Observable<UserProfile>;
  comments$: Observable<Comment[]>;
  routeSubs: Subscription;
  // For Temp purpose
  selectedTripId: any;
  private apiLink: string = environment.API_ENDPOINT; // "http://localhost:3000";
  // Note: Localhost url dosen work in Facebook as facebook tries to visit and parse the url
  // So, use the commented dummy url for test prupose if required - voidzero
  public tripUrl = window.location.href; //"http://yatrum.com/trips/19"
  public tripTags: String[] = ['yatrum', 'travel'];
  constructor(private store: Store<fromRoot.State>,
    private ng2cable: Ng2Cable,
    private broadcaster: Broadcaster,
    private authService: ServerAuthService) {
    
    document.body.scrollTop = 0;    
    this.ng2cable.subscribe(`${this.apiLink}/cable`, 'CommentsChannel');
    this.trip$ =     
      this.store.select(fromRoot.getSelectedTrip)
        .do(trip => {
          if (trip) {
            this.selectedTripId = trip.id; 
            this.store.dispatch(new LoadCommentsAction(trip.id));
            // Increase Trip View Count in Backend
            this.store.dispatch(new IncreaseViewCountAction(trip.id));
            this.trip = trip;
            this.tripUser = trip.user
          }
        });

    this.comments$ = this.store.select(fromRoot.getSelectedTripComments);
    this.loggedInUser$ = this.store.select(fromRoot.getUserProfile);

    // init listener
    this.broadcaster.on<string>('CreateComments').subscribe(
      message => {
        this.store.dispatch(new LoadCommentsAction(this.selectedTripId));
      }
    );
  }

  ngOnInit() {
  }

  tripFollowState() {
    if (!this.trip) return 'inactive';
    return this.trip.user.is_followed_by_current_user ? 'active' : 'inactive';
  }

  onToggleFollow() {
    this.store.dispatch(new FollowUserAction(this.trip.user_id))
  }  

  belongsToLoggedInUser() {
    return this.authService.belongsToLoggedInUser(this.tripUser.id)
  }


  // Unsubscribe from the channel
  ngOnDestroy() {
    this.ng2cable.unsubscribe();
  }
}
