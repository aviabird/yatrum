import * as fromTripActions from './../../../../actions/trips.action';
import * as fromRoot from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { TripsService } from './../../../../services/trips.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from './../../../../models/trip';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-trip-flow-chart',
  templateUrl: './trip-flow-chart.component.html',
  styleUrls: ['./trip-flow-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripFlowChartComponent implements OnInit {
  private subscription: Subscription;
  tripIndex: string;
  selectedTrip$: Observable<Trip>;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private tripService: TripsService,
              private store: Store<fromRoot.State>) {
    
    this.selectedTrip$ = this.store.select(fromRoot.getSelectedTrip);

  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.tripIndex = params['id'];
        this.store.dispatch(new fromTripActions.SelectTripAction(this.tripIndex))     
      }
    )
  }

}
