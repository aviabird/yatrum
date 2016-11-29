import * as fromTripReducer from './trips.reducer';
import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';

import { UserProfile } from '../models/user-profile';
import * as fromUserReducer from './user.reducer';

export interface State {
    user: fromUserReducer.State;
    trips: fromTripReducer.State;
    travelers: any;
} 

const reducers = {
    user: fromUserReducer.reducer,
    trips: fromTripReducer.reducer
}

export const developmentReducers: ActionReducer<State> = combineReducers(reducers);



// =============== user-auth states and compose methods ===============================================

export function getUserState(state$: Observable<State>): Observable<fromUserReducer.State> {
    return state$.select(state => state.user);
}

export const getUserProfile = compose(fromUserReducer.getUserProfile, getUserState);
export const getAuthStatus = compose(fromUserReducer.getAuthStatus, getUserState);


// ============= trip states and compose methods ======================================================

export function getTripsState(state$: Observable<State>): Observable<fromTripReducer.State> {
    return state$.select(state => state.trips);
}

export const getTrips = compose(fromTripReducer.getTrips, getTripsState);



