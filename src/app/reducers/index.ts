import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';

import { UserProfile } from '../models/user-profile';
import * as fromUserReducer from './user.reducer';
import * as fromTripsReducer from './trips.reducer';
import * as fromNotificationReducer from './notification.reducer';
import * as fromInstagramReducer from './instagram.reducers';
import * as fromCommentReducr from './comments.reducer';
import { UpdateLoginFormNotification } from './../actions/notification.action';
import { environment } from '../../environments/environment';

import { storeFreeze } from 'ngrx-store-freeze';


export interface State {
	user: fromUserReducer.State;
	trips: fromTripsReducer.State;
	notifications: fromNotificationReducer.State;
	instagramMedia: fromInstagramReducer.State;
	comments: fromCommentReducr.State;
}

const reducers = {
	user: fromUserReducer.reducer,
	trips: fromTripsReducer.reducer,
	notifications: fromNotificationReducer.reducer,
	instagramMedia: fromInstagramReducer.reducer,
	comments: fromCommentReducr.reducer
}

export const developmentReducer: ActionReducer<State> = combineReducers(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	if (environment.production) {
		return productionReducer(state, action);
	}
	else {
		return developmentReducer(state, action);
	}
}

// ============= trips list states and compose methods ======================================================

export function getTripsState(state: State): fromTripsReducer.State {
	return state.trips;
}

export const getTrips = createSelector(getTripsState, fromTripsReducer.getTrips);
export const getTripIds = createSelector(getTripsState, fromTripsReducer.getTripIds);
export const getSelectedTripId = createSelector(getTripsState, fromTripsReducer.getSelectedTripId);

export const getTripsCollection = createSelector(getTrips, getTripIds, (trips, ids) => {
	return ids.map(id => trips[id]);
});

export const getSelectedTrip = createSelector(getTrips, getSelectedTripId, (trips, id) => {
	return trips[id];
});

// export const getCitiesFromTrip = createSelector(getSelectedTrip, (trip) => {
// 	if (!trip) { return [] };
// 	return trip.cities;
// })

// export const getSelectedCity = createSelector(getCitiesFromTrip, getSelectedCityId, (cities, cityId) => {
// 	return cities.filter(city => city.id == cityId)[0];
// });


// =============== user-auth states and compose methods ===============================================

export function getUserState(state: State): fromUserReducer.State {
	return state && state.user;
}

export const getUserProfile = compose(fromUserReducer.getUserProfile, getUserState);
export const getAuthStatus = compose(fromUserReducer.getAuthStatus, getUserState);
export const getLoggedInUserId = compose(fromUserReducer.getLoggedInUserId, getUserState);
export const getSelectedProfileUser = compose(fromUserReducer.getSelectedProfileUser, getUserState);
export const getUserTripIds = compose(fromUserReducer.getUserTripIds, getUserState);
export const getUserFollowers = compose(fromUserReducer.getUserFollowers, getUserState);
export const getUserFollowing = compose(fromUserReducer.getUserFollowing, getUserState);
export const getUserPictures = compose(fromUserReducer.getUserPictures, getUserState);

export const getUserTripsCollection = createSelector(getTrips, getUserTripIds, (trips, ids) => {
	return ids.map(id => trips[id]);
})


// ============= notification list states and compose methods ===============================================

export function getNotificationState(state: State): fromNotificationReducer.State {
	return state.notifications;
}

export const getLoginFormMessage = compose(fromNotificationReducer.getLoginMessage, getNotificationState);
export const getSignUpFormMessage = compose(fromNotificationReducer.getSignUpMessage, getNotificationState);

// ===================Instagram list states and compose methods ================================================

function getInstagramState(state: State): fromInstagramReducer.State {
	return state.instagramMedia;
}

export const getInstagramMedia = createSelector(getInstagramState, fromInstagramReducer.getInstagramMedia);

// ************************************
// Comment State Funcations
// ************************************
export const getCommentState = (appState: State) => appState.comments;

export const getCommentEntities = createSelector(getCommentState, fromCommentReducr.getEntities);
export const getCommentIds = createSelector(getCommentState, fromCommentReducr.getIds);

export const getComments = createSelector(getCommentEntities, getCommentIds, (comments, ids) => {
  return ids.map(id => comments[id]);
});

export const getSelectedTripComments = createSelector(getComments, getSelectedTripId, (comments, trip_id) => {
  return comments.filter(comment => comment.trip_id == trip_id)
})
// ------------------------------------
