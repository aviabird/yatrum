import { TripsState } from './trips-state';
import { createSelector } from 'reselect';
import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/trips.action';
import { Action } from '@ngrx/store';
import { Trip } from './../models/trip';
import { combineLatest } from 'rxjs/observable/combineLatest';

export interface State {
	tripIds: string[];
	trips: { [id: string]: Trip };
	selectedTripId: string;
	selectedCityId: string;
	editingTrip: Trip; 
}

const trip = <Trip>{}; // empty object
const initialState = {
	tripIds: [],
	trips: {},
	selectedTripId: null,
	selectedCityId: null,
	editingTrip: trip
}

export function reducer(state = initialState, action: Action ): State {
	switch(action.type) {
		// TODO: CS: Refactor these return objects also make sure this 
		// is consistent in other reducers too.
		// https://www.pivotaltracker.com/story/show/136717477
		case ActionTypes.LOAD_TRIPS_SUCCESS: {
			//TODO: Make this method use trips already cached 
			//Only add to store the new trips from backend.
			//Story https://www.pivotaltracker.com/story/show/137695851
			const payloadTrips = action.payload;
			const tripIds = payloadTrips.map(trip => trip.id);

			const trips = payloadTrips.reduce( ( trips: { [id: string]: Trip }, trip: Trip ) => {
				return Object.assign(trips, {
					[trip.id]: trip
				});
			}, {});

			return Object.assign({}, state, {
				tripIds: tripIds,
				trips: trips
			})
		}
		case ActionTypes.LOAD_MORE_TRIPS_SUCCESS: {
			const payloadTrips = action.payload;
			const newTrips = payloadTrips.filter(trip => !state.trips[trip.id]);
			const tripIds = payloadTrips.map(trip => trip.id);

			const trips = newTrips.reduce( ( trips: { [id: string]: Trip }, trip: Trip ) => {
				return Object.assign(trips, {
					[trip.id]: trip
				});
			}, {});

			return Object.assign({}, state, {
				tripIds: [...state.tripIds, ...tripIds],
				trips: Object.assign({}, state.trips, trips)
			}) 
		}
		case ActionTypes.LOAD_USER_TRIPS_SUCCESS: {
      const payloadTrips = action.payload;
			const newTrips = payloadTrips.filter(trip => {
				return !state.trips[trip.id]
			});

			const trips = newTrips.reduce( ( trips: { [id: string]: Trip }, trip: Trip ) => {
				return Object.assign(trips, {
					[trip.id]: trip
				});
			}, {});

			
      return Object.assign({}, state, {
        trips: Object.assign({}, state.trips, trips)
      })
		}
		case ActionTypes.ADD_TRIP_TO_STORE: {
			const trip = action.payload;
			const newTrip = {
				[trip.id]: trip 
			} 

			return Object.assign({}, state, {
				tripIds: [...state.tripIds, trip.id],
				trips: Object.assign({}, state.trips, newTrip)
			})
		}
		
		case ActionTypes.SELECT_TRIP: {
			return Object.assign({}, state, {
				selectedTripId: action.payload,
				selectedCityId: null
			});
		}
		case ActionTypes.SELECT_CITY: {
			return Object.assign({}, state, {
				selectedCityId: action.payload
			});
		}
		case ActionTypes.SAVE_TRIP_SUCCESS: {
			const trip = action.payload;
			return Object.assign({}, state, {editingTrip: trip})
		}
		case ActionTypes.CLEAR_EDITING_TRIP: {
			// Removed trip which was being edited
			return Object.assign({}, state, {editingTrip: trip})
		}
		case ActionTypes.SEARCH_TRIPS: {
			return Object.assign({}, initialState)
		}
		case ActionTypes.UPDATE_TRIP_SUCCESS: {
			const updatedTrip = action.payload;
			const updatedTripId = updatedTrip.id

			let newTrips = state.trips;
			newTrips[updatedTripId] = updatedTrip;

			return Object.assign({}, state, {
				trips: newTrips
			})
		}
		default: {
			return state;
		}
	}
}

export function getTrips(state : State) {
    return state.trips;
} 

export function getTripIds(state: State) {
    return state.tripIds;
}

export function getSelectedTripId(state: State) {
    return state.selectedTripId;
}

export function getSelectedCityId(state: State) {
    return state.selectedCityId;
}

// Buggy implementation change when working on editing feature
export function isEditingTrip(state: State): boolean {
	return state.editingTrip.hasOwnProperty('id') ? true : false;
}

export function getEditingTrip(state: State): Trip {
	return state.editingTrip;
}