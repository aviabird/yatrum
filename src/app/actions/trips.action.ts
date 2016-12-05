import { City } from './../models/city';
import { Trip } from './../models/trip';
import { Action } from '@ngrx/store';

export const ActionTypes = {
	LOAD_TRIPS: "Load [Trips]",
	LOAD_TRIPS_SUCCESS: "Load [Trips] Success",
	SELECT_TRIP: "Select [Trip]",
	SELECT_CITY: "Select [City] from [Trip]"
}


export class LoadTripsAction {
	type = ActionTypes.LOAD_TRIPS;
	constructor() {}
}

export class TripsLoadedAction {
	type = ActionTypes.LOAD_TRIPS_SUCCESS;
	constructor(public payload: Trip[]) {}
}

export class SelectTripAction {
	type = ActionTypes.SELECT_TRIP;
	constructor(public payload: string) {}
}

export class SelectCityFromTripAction {
	type = ActionTypes.SELECT_CITY;
	constructor(public payload: string) {}
}
