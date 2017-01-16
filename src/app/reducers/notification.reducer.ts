import { Observable } from 'rxjs/Observable';
import { ActionTypes } from './../actions/notification.action';
import { Action } from '@ngrx/store';

export interface State {
    loginFormErrorMessage: string;
    signUpFormErrorMessage: string;
}

const initialState = {
    loginFormErrorMessage: null,
    signUpFormErrorMessage: null
}

export function reducer(state = initialState, action: Action ): State {
    switch(action.type) {
        case ActionTypes.UPDATE_LOGIN_NOTIFICATION: {
            console.log('updating message for the login form');
            let message = action.payload;
            state.loginFormErrorMessage = message;
            return Object.assign({}, state);
        }
        case ActionTypes.UPDATE_SIGNUP_NOTIFICATION: {
            let message = action.payload;
            state.signUpFormErrorMessage = message;
            return Object.assign({}, state);
        }
        default: {
            return initialState;
        }
    }
}

export function getLoginMessage(state: State): string {
    return state.loginFormErrorMessage;
}
export function getSignUpMessage(state: State): string {
    return state.signUpFormErrorMessage;
}

