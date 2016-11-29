import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/trips.action';
import { Action } from '@ngrx/store';
import { Trip } from './../models/trip';

export interface State {
    trips: Trip[];
}

const initialState = {
    trips: []
}

export function reducer(state = initialState, action: Action ) {
    switch(action.type) {
        case ActionTypes.LOAD_TRIPS_SUCCESS: {
            return {
                trips: action.payload
            }
        }
        default:
            return state;
    }

}


export function getTrips(state$ : Observable<State>): Observable<Trip[]> {
    return state$.select(state => state.trips);
}