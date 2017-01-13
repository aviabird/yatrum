import { LoadUserTripsAction } from './../../../../actions/trips.action';
import * as fromRoot from './../../../../reducers/index';
import { UserProfile } from './../../../../models/user-profile';
import { Trip } from './../../../../models/trip';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.scss']
})
export class UserTripsComponent implements OnInit {
  private subscription: Subscription
  userTrips$: Observable<Trip[]>;
  public user$: Observable<UserProfile>;
  userIndex: string;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.user$ = this.store.select(fromRoot.getSelectedProfileUser);
    this.userTrips$ = this.store.select(fromRoot.getUserTripsCollection);
   }

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserTripsAction(this.userIndex));
  }

}
