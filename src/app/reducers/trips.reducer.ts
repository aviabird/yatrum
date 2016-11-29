import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/trips.action';
import { Action } from '@ngrx/store';
import { Trip } from './../models/trip';
import { combineLatest } from 'rxjs/observable/combineLatest';

export interface State {
    trips: Trip[];
    selectedTripId: string;
}

const initialState = {
    trips: [],
    selectedTripId: null
}

export function reducer(state = initialState, action: Action ): State {
    switch(action.type) {
        case ActionTypes.LOAD_TRIPS_SUCCESS: {
            return Object.assign({},state,{trips: action.payload})
        }
        case ActionTypes.SELECT_TRIP: {
            return Object.assign({},state,{selectedTripId: action.payload})
        }
        default:
            return state;
    }

}


export function getTrips(state$ : Observable<State>): Observable<Trip[]> {
    return state$.select(state => state.trips);
}


export function getSelectedTripId(state$: Observable<State>): Observable<string> {
    return state$.select(state => state.selectedTripId);
}

export function getSelectedTrip(state$: Observable<State>): Observable<Trip> {
    return combineLatest<any> (
        state$.let(getTrips),
        state$.let(getSelectedTripId)
    )
    .map(([ trips, tripId ]) => {
        return trips.filter((trip) => trip.id == tripId)[0];
    }) 
}



