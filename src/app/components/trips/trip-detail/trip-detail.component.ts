import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import * as fromTripActions from './../../../actions/trips.action';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css'], 
})
export class TripDetailComponent implements OnInit {
  private subscription: Subscription;
  tripIndex: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.tripIndex = params['id'];
        this.store.dispatch(new fromTripActions.SelectTripAction(this.tripIndex))     
      }
    )
  }

}
