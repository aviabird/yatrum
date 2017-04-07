import { Response } from '@angular/http';
import { TripsService } from './../../../../services/trips.service';
import { LoadUserTripsAction } from './../../../../actions/trips.action';
import * as fromRoot from './../../../../reducers/index';
import { UserProfile } from './../../../../models/user-profile';
import { Trip } from './../../../../models/trip';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-user-trips',
  templateUrl: './user-trips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-trips.component.scss']
})
export class UserTripsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  userTrips$: Observable<Trip[]>;
  userIndex: string;
  hideLoader$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private tripService: TripsService)
  {
    this.hideLoader$ = this.tripService.loading.select(response => !response)
    this.userTrips$ = this.store.select(fromRoot.getUserTripsCollection)
  }

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserTripsAction(this.userIndex));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
