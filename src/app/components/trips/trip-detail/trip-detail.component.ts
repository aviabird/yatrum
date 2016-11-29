import { Observable } from 'rxjs/Observable';
import * as fromTripActions from './../../../actions/trips.action';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { TripsService } from './../../../services/trips.service';
import { Trip } from './../../../models/trip';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripDetailComponent implements OnInit {
  private subscription: Subscription;
  tripIndex: string;
  selectedTrip$: Observable<Trip>;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private tripService: TripsService,
              private store: Store<fromRoot.State>) { 

    this.selectedTrip$ = this.store.let(fromRoot.getSelectedTrip);

  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.tripIndex = params['id'];
        this.store.dispatch(new fromTripActions.SelectTripAction(this.tripIndex))     
      }
    )
  }

  goBack() {
    this.router.navigate(["../"]);
  }

}
