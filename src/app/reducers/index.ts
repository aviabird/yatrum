import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';

import { UserProfile } from '../models/user-profile';
import * as fromUserReducer from './user.reducer';
import * as fromTripsReducer from './trips.reducer';
import * as fromNotificationReducer from './notification.reducer';
import { UpdateLoginFormNotification } from './../actions/notification.action';

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

export function getTripsState(state: State): fromTripsReducer.State {
    return state.trips;
}

export const getTrips = createSelector(getTripsState, fromTripsReducer.getTrips);
export const getTripIds = createSelector(getTripsState, fromTripsReducer.getTripIds);
export const getSelectedTripId = createSelector(getTripsState, fromTripsReducer.getSelectedTripId);
export const getSelectedCityId = createSelector(getTripsState, fromTripsReducer.getSelectedCityId);

export const getTripsCollection = createSelector(getTrips, getTripIds, (trips, ids) => {
    return ids.map(id => trips[id]);
});

export const getSelectedTrip = createSelector(getTrips, getSelectedTripId, (trips, id) => {
    return trips[id];
});

export const getCitiesFromTrip = createSelector(getSelectedTrip, (trip) => {
    return trip.cities;
})

export const getSelectedCity = createSelector(getCitiesFromTrip, getSelectedCityId, (cities, cityId) => {
    return cities.filter(city => city.id == cityId)[0];
});

// ============= notification list states and compose methods ========================

export function getNotificationState(state$: Observable<State>): Observable<fromNotificationReducer.State> {
    return state$.select(state => state.notifications);
}

export const getLoginFormMessage = compose(fromNotificationReducer.getLoginMessage, getNotificationState);
