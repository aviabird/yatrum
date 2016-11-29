import { Trip } from './../models/trip';
import { Action } from '@ngrx/store';

export const ActionTypes = {
    LOAD_TRIPS: "Load [Trips]",
    LOAD_TRIPS_SUCCESS: "Load [Trips] Success",
    LOAD_TRIP_DETAIL: "Load [Trip] Detail",
    LOAD_TRIP_DETAIL_SUCCESS: "Load [Trip] Detail Success"
}


export class LoadTripsAction {
    type = ActionTypes.LOAD_TRIPS;

    constructor() {}
}

export class TripsLoadedAction {
    type = ActionTypes.LOAD_TRIPS_SUCCESS;

    constructor(public payload: Trip[]) {}
}
