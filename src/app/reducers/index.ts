import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';

import { UserProfile } from '../models/user-profile';
import * as fromUserTripsReducer from './user-trips.reducer';
import * as fromUserReducer from './user.reducer';
import * as fromTripsReducer from './trips.reducer';
import * as fromNotificationReducer from './notification.reducer';
import { UpdateLoginFormNotification } from './../actions/notification.action';

export interface State {
	user: fromUserReducer.State;
	userTrips: fromUserTripsReducer.State;
	trips: fromTripsReducer.State;
	notifications: fromNotificationReducer.State;
} 

const reducers = {
	user: fromUserReducer.reducer,
	userTrips: fromUserTripsReducer.reducer,
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

// ============= User Trip list States and compose methods ==================================================

export function getUserTripsState(state: State): fromUserTripsReducer.State  {
	return state.userTrips;
}

export const getUserTrips = createSelector(getUserTripsState, fromUserTripsReducer.getUserTrips);
export const getUserTripIds = createSelector(getUserTripsState, fromUserTripsReducer.getUserTripIds);
export const getSelectedUserId = createSelector(getUserTripsState, fromUserTripsReducer.getSelectedUserId);

export const getUserTripsCollection = createSelector(getUserTrips, getUserTripIds, (userTrips, userTripIds) => {
	return userTripIds.map(id => userTrips[id]);
})

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


// Since we have to select a trip, either from dashboard trips or from user trips, so first we
// are merging all trips, and then we can select a particular trip.
export const getSelectedTrip = createSelector(getTrips, getUserTrips, getSelectedTripId, (trips, userTrips, id) => {
	const allTrips = Object.assign({},trips,userTrips);
	return allTrips[id];
});

export const getCitiesFromTrip = createSelector(getSelectedTrip, (trip) => {
	return trip.cities;
})

export const getSelectedCity = createSelector(getCitiesFromTrip, getSelectedCityId, (cities, cityId) => {
  return cities.filter(city => city.id == cityId)[0];
});

export const getTripUserId = createSelector(getSelectedTrip, (trip) => {
	return trip.user_id;
})

export const getTripUserName = createSelector(getSelectedTrip, (trip) => {
	return trip.traveller_name;
})

// ============= notification list states and compose methods ===============================================

export function getNotificationState(state$: Observable<State>): Observable<fromNotificationReducer.State> {
  return state$.select(state => state.notifications);
}

export const getLoginFormMessage = compose(fromNotificationReducer.getLoginMessage, getNotificationState);
export const getSignUpFormMessage = compose(fromNotificationReducer.getSignUpMessage, getNotificationState);
