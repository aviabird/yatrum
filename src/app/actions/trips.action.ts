import { City } from './../models/city';
import { Trip } from './../models/trip';
import { Action } from '@ngrx/store';

export const ActionTypes = {
	LOAD_FEED_TRIPS: "Load Feed [Trips]",
	LOAD_TRENDING_TRIPS: "Load Trending [Trips]",
	LOAD_TRIPS_SUCCESS: "Load [Trips] Success",
	LOAD_MORE_TRIPS: "Load More [Trips]",
	LOAD_MORE_TRIPS_SUCCESS: "Load More [Trips] Success",	
	SELECT_TRIP: "Select [Trip]",
	CLEAR_SELECTED_TRIP: "Clear Selected [Trip]",
	SELECT_CITY: "Select [City] from [Trip]",
	LOAD_USER_TRIPS: "Load [User Trips]",
	LOAD_USER_TRIPS_SUCCESS: "Load [User Trips] Success",
	SET_USER_TRIP_IDS: "Set [User] Trip Ids",
	SAVE_TRIP: "Save [Trip]",
	SAVE_TRIP_SUCCESS: "Save [Trip] Success",
	UPDATE_TRIP: "Update [Trip]",
	UPDATE_TRIP_SUCCESS: "Update [Trip] Success",
	CLEAR_EDITING_TRIP: "Clear Editing [Trip]",
	ADD_TRIP_TO_STORE: "Add [Trip] to Local Store",
	SEARCH_TRIPS: "Search [Trips]",
	LIKE_TRIP: "Like [Trip]",
	TRIP_USER_FOLLOWED: "[Trip] User Followed",
  INCREASE_VIEW_COUNT: "Increase View Count",
  INCREASE_VIEW_COUNT_SUCCESS: "Increase View Count Success"
}

export class LoadFeedTripsAction {
	type = ActionTypes.LOAD_FEED_TRIPS;
	constructor(public payload: Object) { }
}
export class LoadTrendingTripsAction {
	type = ActionTypes.LOAD_TRENDING_TRIPS;
	constructor(public payload: Object) { }
}
export class TripsLoadedAction {
	type = ActionTypes.LOAD_TRIPS_SUCCESS;
	constructor(public payload: Trip[]) { }
}
export class LoadMoreTripsAction {
	type = ActionTypes.LOAD_MORE_TRIPS;
	constructor(public payload: Object) {}
}
export class MoreTripsLoadedAction {
	type = ActionTypes.LOAD_MORE_TRIPS_SUCCESS;
	constructor(public payload: Trip[]) {}
}
export class SelectTripAction {
	type = ActionTypes.SELECT_TRIP;
	constructor(public payload: string) { }
}
export class ClearSelectedTripAction {
	type = ActionTypes.CLEAR_SELECTED_TRIP;
	constructor() {}
}
export class SelectCityFromTripAction {
	type = ActionTypes.SELECT_CITY;
	constructor(public payload: string) { }
}
export class LoadUserTripsAction {
	type = ActionTypes.LOAD_USER_TRIPS
	constructor(public payload: string) { }
}
export class UserTripsLoadedAction {
	type = ActionTypes.LOAD_USER_TRIPS_SUCCESS;
	constructor(public payload: Trip[]) { }
}
export class SetUserTripIds {
	type = ActionTypes.SET_USER_TRIP_IDS;
	constructor(public payload: Trip[]) {}
}
export class SaveTripAction {
	type = ActionTypes.SAVE_TRIP;
	constructor(public payload: Trip) { }
}
export class SaveTripSuccessAction {
	type = ActionTypes.SAVE_TRIP_SUCCESS;
	constructor(public payload: Trip) { }
}
export class UpdateTripAction {
	type = ActionTypes.UPDATE_TRIP;
	constructor(public payload: Trip) { }
}
export class UpdateTripSuccessAction {
	type = ActionTypes.UPDATE_TRIP_SUCCESS;
	constructor(public payload: Trip) { }
}
export class ClearEditingTripAction {
	type = ActionTypes.CLEAR_EDITING_TRIP;
	constructor() { }
}
export class AddTripToLocalStore {
	type = ActionTypes.ADD_TRIP_TO_STORE;
	constructor(public payload: Trip) { }
}
export class SearchTrip {
	type = ActionTypes.SEARCH_TRIPS;
	constructor(public payload: string) { }
}
export class LikeTripAction {
	type = ActionTypes.LIKE_TRIP;
	constructor(public payload: string) { }
}

export class TripUserFollowedAction {
	type = ActionTypes.TRIP_USER_FOLLOWED;
	constructor(public payload: any) {}
}

export class IncreaseViewCountAction {
  type = ActionTypes.INCREASE_VIEW_COUNT;
  constructor(public payload: any) { }
}

export class IncreaseViewCountSuccessAction {
  type = ActionTypes.INCREASE_VIEW_COUNT_SUCCESS;
  constructor(){ }
}