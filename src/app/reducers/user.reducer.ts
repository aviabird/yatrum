import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/user-auth.action';
import { Action } from '@ngrx/store';
import { UserProfile } from './../models/user-profile';

export interface State {
  user_profile: UserProfile;
  auth: boolean;
}

const initialState = {
 user_profile: {name: null,
                email: null,
                photoURL: null,
                user_uid: null,
                provider_uid: null
              },
  auth: false
};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in success');
      return {
        user_profile: {name: null,
                email: null,
                photoURL: null,
                user_uid: null,
                provider_uid: null
              },
        auth: true
      }
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      // return Object.assign({}, state, {auth: true});
      console.log('in logout success');
      return {
        user_profile: {name: null,
                email: null,
                photoURL: null,
                user_uid: null,
                provider_uid: null
              },
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

export function getAuthStatus (state$: Observable<State>): Observable<boolean> {
  return state$.select(state => state.auth);
}