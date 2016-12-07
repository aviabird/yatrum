import { ActionTypes } from './../actions/trips.action';
import { Action } from '@ngrx/store';
import { Trip } from './../models/trip';

export interface State {
	selectedUserId: string;
	userTrips: { [id: string]: Trip[] };
}

const initialState = {
	selectedUserId: null,
	userTrips: {}
}

export function reducer(state = initialState, action: Action) {
	switch(action.type) {
	
		case ActionTypes.LOAD_USER_TRIPS: {
			return Object.assign({},state,{
				selectedUserId: action.payload
			})
		}
	
		case ActionTypes.LOAD_USER_TRIPS_SUCCESS: {
			const trips = action.payload;
			const userId = state.selectedUserId;
			let newTrips = null;
			let userNewTrips = null;

			if(state.userTrips[userId]) {
				newTrips = trips.filter(trip => state.userTrips[userId]);
				userNewTrips = { [userId]: [...state.userTrips[userId], ...newTrips] } 
			}
			else {
				newTrips = trips;
				userNewTrips = { [userId]: newTrips }
			}

			return Object.assign({},state,{
				userTrips: userNewTrips
			})


		}
	}
}



export function getUserTrips(state: State) {
	return state.userTrips;
}

export function getSelectedUserId(state: State) {
	return state.selectedUserId;
}
