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
    .map((data) => {
      return new TripsActions.TripsLoadedAction(data);
    })
}