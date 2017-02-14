import { createSelector } from 'reselect';
import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/trips.action';
import { Action } from '@ngrx/store';
import { Trip } from './../models/trip';
import { combineLatest } from 'rxjs/observable/combineLatest';

export interface State {
  feedIds: string[];
  trendingIds: string[];
  entities: { [id: string]: Trip };
  selectedTripId: string;
}

const trip = <Trip>{}; // empty object
const initialState = {
  feedIds: [],
  trendingIds: [], 
  entities: {},
  selectedTripId: null,
}

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    // TODO: CS: Refactor these return objects also make sure this 
    // is consistent in other reducers too.
    // https://www.pivotaltracker.com/story/show/136717477
    case ActionTypes.LOAD_FEED_TRIPS_SUCCESS: {
      //TODO: Make this method use trips already cached 
      //Only add to store the new trips from backend.
      //Story https://www.pivotaltracker.com/story/show/137695851
      let newState = pushTrips("feeds", action.payload)
      return Object.assign({}, state, newState)
    }
    case ActionTypes.LOAD_TRENDING_TRIPS_SUCCESS: {
      //TODO: Make this method use trips already cached 
      //Only add to store the new trips from backend.
      //Story https://www.pivotaltracker.com/story/show/137695851
      let newState = pushTrips("trending", action.payload)
      return Object.assign({}, state, newState)
    }
    case ActionTypes.LOAD_MORE_TRIPS_SUCCESS: {
      let newState = pushMoreTrips(action.payload.tripsType, action.payload.trips, state)
      return Object.assign({}, state, newState)
    }
    case ActionTypes.LOAD_USER_TRIPS_SUCCESS: {
      const payloadTrips = action.payload;
      const tripIds = payloadTrips.map(trip => trip.id);

      const trips = payloadTrips.reduce((trips: { [id: string]: Trip }, trip: Trip) => {
        return Object.assign(trips, {
          [trip.id]: trip
        });
      }, {});

      return Object.assign({}, state, {
        feedIds: [],
        trendingIds: [], 
        entities: trips     
      })

    }
    case ActionTypes.ADD_TRIP_TO_STORE: {
      const trip = action.payload;
      const newTrip = {
        [trip.id]: trip
      }

      return Object.assign({}, state, {
        feedIds: [...state.feedIds, trip.id],
        trendingIds: [...state.trendingIds, trip.id],
        entities: Object.assign({}, state.entities, newTrip)
      })
    }

    case ActionTypes.SELECT_TRIP: {
      return Object.assign({}, state, {
        selectedTripId: action.payload
      });
    }
    case ActionTypes.CLEAR_SELECTED_TRIP: {
      return Object.assign({}, state, {
        selectedTripId: null
      })
    }
    case ActionTypes.SELECT_CITY: {
      return Object.assign({}, state, {
        selectedCityId: action.payload
      });
    }
    case ActionTypes.SAVE_TRIP_SUCCESS: {
      const trip = action.payload;
      const newTrip = {
        [trip.id]: trip
      }
      return Object.assign({}, state, {
        feedIds: [...state.feedIds, trip.id],
        trendingIds: [...state.trendingIds, trip.id],
        entities: Object.assign({}, state.entities, newTrip)
      })
    }
    case ActionTypes.SEARCH_TRIPS: {
      return Object.assign({}, initialState)
    }
    case ActionTypes.UPDATE_TRIP_SUCCESS: {
      const updatedTrip = action.payload;
      const updatedTripId = updatedTrip.id

      let newTrips = Object.assign({}, state.entities);
      newTrips[updatedTripId] = updatedTrip;

      return Object.assign({}, state, {
        trips: newTrips
      })
    }
    case ActionTypes.TRIP_USER_FOLLOWED: {
      const user = action.payload;
      const tripIds = [...state.feedIds, ...state.trendingIds]
      if(tripIds.length) {
        const newTrips = tripIds.map(id => {
          let trip = state.entities[id];
          if (trip.user.id == user.id) {
            trip.user = user;
          }
          return trip;
        })

        const trips = newTrips.reduce((trips: { [id: string]: Trip }, trip: Trip) => {
          return Object.assign(trips, {
            [trip.id]: trip
          });
        }, {});
        
        return Object.assign({}, state, {
          trips: trips
        })
      }
    }
    default: {
      return state;
    }
  }
}

export function getTrips(state: State) {
  return state.entities;
}

export const getFeedIds = (state: State) => state.feedIds;
export const getTrendingIds = (state: State) => state.trendingIds;

export function getSelectedTripId(state: State) {
  return state.selectedTripId;
}

function pushTrips(tripType: string, tripsArray: [Trip]) {
  const payloadTrips = tripsArray;
  const newTripIds = payloadTrips.map(trip => trip.id);

  const newTrips = payloadTrips.reduce((trips: { [id: string]: Trip }, trip: Trip) => {
    return Object.assign(trips, {
      [trip.id]: trip
    });
  }, {});

  let returnHash = {}

  switch (tripType) {
    case "feeds":
      returnHash = {
        feedIds: newTripIds,
        trendingIds: [],
        entities: Object.assign({},newTrips)
      }
      break;
    case "trending":
      returnHash = {
        trendingIds: newTripIds,
        feedIds: [],
        entities: Object.assign({},newTrips)
      }
      break;
  }

  return returnHash
}

function pushMoreTrips(tripType: string, tripsArray: [Trip], state) {
  const payloadTrips = tripsArray;
  const newTrips = payloadTrips.filter(trip => !state.entities[trip.id]);
  const newTripIds = payloadTrips.map(trip => trip.id);

  const trips = payloadTrips.reduce((trips: { [id: string]: Trip }, trip: Trip) => {
    return Object.assign(trips, {
      [trip.id]: trip
    });
  }, {});

  let returnHash = {}

  switch (tripType) {
    case "feeds":
      returnHash = {
        feedIds: [...state.feedIds, ...newTripIds],
        entities: Object.assign({}, state.entities, trips)
      }
      break;
    case "trending":
      returnHash = {
        trendingIds: [...state.trendingIds, ...newTripIds],
        entities: Object.assign({}, state.entities, trips)
      }
      break;
  }

  return returnHash
}
