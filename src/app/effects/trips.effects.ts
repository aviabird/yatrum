import { ActionTypes } from './../actions/instagram.action';
import * as TripsActions from './../actions/trips.action';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TripsService } from './../services/trips.service';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable() 
export class TripsEffects {
  constructor(private actions$: Actions, private tripsService: TripsService) {}

  @Effect()
  Trips$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.LOAD_TRIPS)
    .switchMap(() => this.tripsService.getTrips())
    .map((data) => new TripsActions.TripsLoadedAction(data));

  @Effect()
  UserTrips$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.LOAD_USER_TRIPS)
    .switchMap((action: Action) => this.tripsService.getUserTrips(action.payload))
    .map((data) => new TripsActions.UserTripsLoadedAction(data));

  @Effect()
  SaveTrip$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.SAVE_TRIP)
    .switchMap((action: Action) => this.tripsService.saveTrip(action.payload))
    .map((data) => new TripsActions.SaveTripSuccessAction(data));

  @Effect()
  UpdateTrip$: Observable<Action> = this.actions$
    .ofType(TripsActions.ActionTypes.UPDATE_TRIP)
    .switchMap((action: Action) => this.tripsService.updateTrip(action.payload))
    .map((data) => new TripsActions.UpdateTripSuccessAction(data));

}