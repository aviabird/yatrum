import { UpdateLoginFormNotification } from './../actions/notification.action';
import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';

import { UserProfile } from '../models/user-profile';
import * as fromUserReducer from './user.reducer';
import * as fromTripsReducer from './trips.reducer';
import * as fromNotificationReducer from './notification.reducer';

export interface State {
    user: fromUserReducer.State;
    trips: fromTripsReducer.State;
    travelers: any;
    notifications: fromNotificationReducer.State;
} 

const reducers = {
    user: fromUserReducer.reducer,
    trips: fromTripsReducer.reducer,
    notifications: fromNotificationReducer.reducer
}

export const developmentReducers: ActionReducer<State> = combineReducers(reducers);

// =============== user-auth states and compose methods ===============================================

export function getUserState(state$: Observable<State>): Observable<fromUserReducer.State> {
    return state$.select(state => state.user);
}

export const getUserProfile = compose(fromUserReducer.getUserProfile, getUserState);
export const getAuthStatus = compose(fromUserReducer.getAuthStatus, getUserState);


// ============= trips list states and compose methods ======================================================

export function getTripsState(state$: Observable<State>): Observable<fromTripsReducer.State> {
    return state$.select(state => state.trips);
}

export const getTrips = compose(fromTripsReducer.getTrips, getTripsState);
export const getSelectedTrip = compose(fromTripsReducer.getSelectedTrip,getTripsState);

// ============= notification list states and compose methods ========================

export function getNotificationState(state$: Observable<State>): Observable<fromNotificationReducer.State> {
    return state$.select(state => state.notifications);
}

export const getLoginFormMessage = compose(fromNotificationReducer.getLoginMessage, getNotificationState);