import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';

import { UserProfile } from '../models/user-profile';
import * as fromUserReducer from './user.reducer';

export interface State {
    user: fromUserReducer.State;
    trip: any;
    travelers: any;
} 

const reducers = {
    user: fromUserReducer.reducer
}

export const developmentReducers: ActionReducer<State> = combineReducers(reducers);

export function getUserState(state$: Observable<State>): Observable<fromUserReducer.State> {
    return state$.select(state => state.user);
}

export const getUserProfile = compose(fromUserReducer.getUserProfile, getUserState);


export const getAuthStatus = compose(fromUserReducer.getAuthStatus, getUserState);