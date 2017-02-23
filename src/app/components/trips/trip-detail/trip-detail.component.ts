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
  tripUser = new UserProfile();
  loggedInUser$: Observable<UserProfile>;
  comments$: Observable<Comment[]>;
  routeSubs: Subscription;
  // For Temp purpose
  selectedTripId: any;

  constructor(private store: Store<fromRoot.State>,
    private ng2cable: Ng2Cable,
    private broadcaster: Broadcaster,
    private tripsService: TripsService) {
    
    this.ng2cable.subscribe('http://localhost:3000/cable', 'CommentsChannel');
    
    this.trip$ =
      this.store.select(fromRoot.getSelectedTrip)
        .do(trip => {
          if (trip) {
            this.selectedTripId = trip.id; 
            this.store.dispatch(new LoadCommentsAction(trip.id));
            this.tripUser = trip.user
          }
        });

    this.comments$ = this.store.select(fromRoot.getSelectedTripComments);
    this.loggedInUser$ = this.store.select(fromRoot.getUserProfile);

    // init listener
    this.broadcaster.on<string>('CreateComments').subscribe(
      message => {
        console.log("New Message Arrived", this.selectedTripId, message);
        this.store.dispatch(new LoadCommentsAction(this.selectedTripId));
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
