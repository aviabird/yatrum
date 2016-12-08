import { Trip } from './../../models/trip';
import { Observable } from 'rxjs/Observable';
import { LoadUserTripsAction } from './../../actions/trips.action';
import { State, getUserTripsCollection } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'tr-traveller-profile',
  templateUrl: './traveller-profile.component.html',
  styleUrls: ['./traveller-profile.component.css']
})
export class TravellerProfileComponent {

  private subscription: Subscription;
  private userIndex: string;
  userTrips$: Observable<Trip[]>

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute) { 
    this.userTrips$ = this.store.select(getUserTripsCollection);
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserTripsAction(this.userIndex));
  }

}
