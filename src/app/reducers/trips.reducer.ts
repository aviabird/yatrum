import { createSelector } from 'reselect';
import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/trips.action';
import { Action } from '@ngrx/store';
import { Trip } from './../models/trip';
import { combineLatest } from 'rxjs/observable/combineLatest';

export interface State {
    ids: string[];
    trips: { [id: string]: Trip };
    selectedTripId: string;
    selectedCityId: string;
}

const initialState = {
    ids: [],
    trips: {},
    selectedTripId: null,
    selectedCityId: null
}

export function reducer(state = initialState, action: Action ): State {
    switch(action.type) {
        case ActionTypes.LOAD_TRIPS_SUCCESS: {
            const Trips = action.payload;
            const newTrips = Trips.filter(trip => !state.trips[trip.id]);
            const newTripIds = newTrips.map(trip => trip.id);
            
            const trips = newTrips.reduce( ( trips: { [id: string]: Trip }, trip: Trip ) => {
                return Object.assign(trips, {
                    [trip.id]: trip
                });
            }, {});

            return {
                ids: [ ...state.ids, ...newTripIds],
                trips: Object.assign({}, state.trips, trips),
                selectedTripId: state.selectedTripId,
                selectedCityId: state.selectedCityId
            };
        }

        case ActionTypes.SELECT_TRIP: {
            return {
                ids: state.ids,
                trips: state.trips,
                selectedTripId: action.payload,
                selectedCityId: null
            };
        }

        case ActionTypes.SELECT_CITY: {
            return {
                ids: state.ids,
                trips: state.trips,
                selectedTripId: state.selectedTripId,
                selectedCityId: action.payload
            };
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
    return state.ids;
}

export function getSelectedTripId(state: State) {
    return state.selectedTripId;
}

export function getSelectedCityId(state: State) {
    return state.selectedCityId;
}
