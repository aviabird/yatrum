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
    trips: {},
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
      trips: {},
      token: null,
      created_at: null,
      updated_at: null
    }
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case userAuthActions.LOGIN_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in success');
      return {
        user_profile: action.payload,
        auth: true,
        selected_user_profile: state.selected_user_profile
      }
    }
    case userAuthActions.LOGOUT_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in logout success');
      return {
        user_profile: initialState.user_profile,
        auth: false,
        selected_user_profile: state.selected_user_profile
      }
    }
    // Authentication with rails api backend
    case userAuthActions.SERVER_LOGIN_SUCCESS: {
      console.log('in server login success');
      return {
        user_profile: action.payload,
        auth: true,
        selected_user_profile: state.selected_user_profile
      }
    }
    case userAuthActions.SERVER_LOGOUT_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in logout success');
      return {
        user_profile: initialState.user_profile,
        auth: false,
        selected_user_profile: state.selected_user_profile
      }
    }
    case userAuthActions.USER_UPDATE_SUCCESS: {
      return {
        user_profile: action.payload,
        auth: true,
        selected_user_profile: state.selected_user_profile
      }
    }
    case userAuthActions.SELECTED_PROFILE_USER: {
      window['payload'] = action.payload;
      return {
        user_profile: state.user_profile,
        auth: state.auth,
        selected_user_profile: action.payload
      }
    }
    case tripActions.LOAD_USER_TRIPS: {
			if(state.selected_user_profile.trips[action.payload]) {
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
		case tripActions.LOAD_USER_TRIPS_SUCCESS: {
			const Trips = action.payload;
			const userId = state.selected_user_profile.id;
			const	newTrips = Trips.filter(trip => !state.selected_user_profile.trips[userId].trips[trip.id]);
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