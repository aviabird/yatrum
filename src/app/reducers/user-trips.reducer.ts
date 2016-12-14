import { TripsState } from './trips-state';
import { ActionTypes } from './../actions/trips.action';
import { Action } from '@ngrx/store';
import { Trip } from './../models/trip';

export interface State {
	selectedUserId: string;
	userTrips: { [id: string]: TripsState };
}

const initialState = {
	selectedUserId: null,
	userTrips: {}

}

export function reducer(state = initialState, action: Action): State {
	switch(action.type) {
		case ActionTypes.LOAD_USER_TRIPS: {
			if(state.userTrips[action.payload]) {
				return Object.assign({},state,{selectedUserId: action.payload});
			}
			return Object.assign({},state,{
				selectedUserId: action.payload,
				userTrips: { 
					[action.payload]: {
						ids: [],
						trips: {}
					}
				}
			})
		}
		case ActionTypes.LOAD_USER_TRIPS_SUCCESS: {
			const Trips = action.payload;
			const userId = state.selectedUserId;
			const	newTrips = Trips.filter(trip => !state.userTrips[userId][trip.id]);
			const newTripIds = newTrips.map(trip => trip.id);
			const trips = newTrips.reduce( ( trips: { [id: string]: Trip }, trip: Trip ) => {
			return Object.assign(trips, {
				[trip.id]: trip
			});
			}, {});

			return Object.assign({},state, {
				userTrips: {
					[state.selectedUserId]: {
						ids: [...state.userTrips[userId].ids, ...newTripIds],
						trips: Object.assign({},state.userTrips[userId].trips,trips)
					}
				}
			})
		}		
		default: {
			return state;
		}
	}
}



export function getUserTrips(state: State) {
	if(state.selectedUserId)
		return state.userTrips[state.selectedUserId].trips;
	else
		return {};
}

export function getUserTripIds(state: State) {
	return state.userTrips[state.selectedUserId].ids;
}

export function getSelectedUserId(state: State) {
	return state.selectedUserId;
}
