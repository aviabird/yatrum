import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/user-auth.action';
import { Action } from '@ngrx/store';
import { UserProfile } from './../models/user-profile';

export interface State {
  user_profile: UserProfile;
  auth: any;
}

const initialState = {
 user_profile: {name: null,
                email: null,
                photoURL: null,
                token: null
              },
  auth: null,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in success');
      return {
        user_profile: action.payload,
        auth: true
      }
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in logout success');
      return {
        user_profile: initialState.user_profile,
        auth: false
      }
    }
    // Authentication with rails api backend
    case ActionTypes.SERVER_LOGIN_SUCCESS: {
      console.log('in server login success');
      return {
        user_profile: action.payload,
        auth: true
      }
    }
    case ActionTypes.SERVER_LOGOUT_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in logout success');
      return {
        user_profile: initialState.user_profile,
        auth: false
      }
    }
    default: {
      return state;
    }
  }
}

//========================= Exporter functions -==================================
export function getUserProfile (state$: Observable<State>): Observable<UserProfile> {
  return state$.select(state => state.user_profile);
}

export function getAuthStatus (state$: Observable<State>): Observable<any> {
  return state$.select(state => state.auth);
}