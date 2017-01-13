import { Trip } from './../models/trip';
import { ActionTypes as tripActions } from './../actions/trips.action';
import { Observable } from 'rxjs/Observable';
import { ActionTypes as userAuthActions } from './../actions/user-auth.action';
import { Action } from '@ngrx/store';
import { UserProfile } from './../models/user-profile';

export interface State {
  user_profile: UserProfile;
  auth: any;
  selected_user_profile: UserProfile;
}

const initialState = {
  //TODO: Provision this dummy object creation to user_profile model
  user_profile: { 
    id: null,
    name: null,
    email: null,
    profilePic: null,
    coverPhoto: null,
    trips: {
      ids: [],
      trips: {},
    },
    token: null,
    created_at: null,
    updated_at: null
  },
    auth: null,
    selected_user_profile: { 
      id: null,
      name: null,
      email: null,
      profilePic: null,
      coverPhoto: null,
      trips: {
        ids: [],
        trips: {},
      },
      token: null,
      created_at: null,
      updated_at: null
    }
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case userAuthActions.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: action.payload,
        auth: true
      });
    }
    case userAuthActions.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: initialState.user_profile,
        auth: false
      });
    }
    // Authentication with rails api backend
    case userAuthActions.SERVER_LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: action.payload,
        auth: true
      })
    }
    case userAuthActions.SERVER_LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: initialState.user_profile,
        auth: false
      })
    }
    case userAuthActions.USER_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        user_profile: action.payload,
        auth: true
      })
    }
    case userAuthActions.SELECTED_PROFILE_USER: {
      return Object.assign({}, state, {
        selected_user_profile: action.payload
      })
    }
		case tripActions.LOAD_USER_TRIPS_SUCCESS: {
      const user_trips = action.payload;
      const user_new_trips = user_trips.filter(trip => !state.selected_user_profile.trips.trips[trip.id]);
      const new_trip_ids = user_new_trips.map(trip => trip.id);

			const trips = user_new_trips.reduce( ( trips: { [id: string]: Trip }, trip: Trip ) => {
				return Object.assign(trips, {
					[trip.id]: trip
				});
			}, {});

      return Object.assign({},state, {
        selected_user_profile: {
          trips: {
            ids: [...state.selected_user_profile.trips.ids, ...new_trip_ids],
            trips: Object.assign({}, state.selected_user_profile.trips.trips, trips)
          }
        }
      })


		}
    default: {
      return state;
    }
  }
}

//========================= Exporter functions -==================================
export function getUserProfile (state: State): UserProfile {
  return state.user_profile;
}

export function getLoggedInUserId(state: State): string {
  return state.user_profile.id;
} 

export function getAuthStatus (state: State): any {
  return state.auth;
}

export function getSelectedProfileUser (state: State): UserProfile {
  return state.selected_user_profile;
}

export function getUserTrips(state: State) {
  return state.selected_user_profile.trips.trips;
}

export function getUserTripIds(state: State) {
  return state.selected_user_profile.trips.ids;
}