import * as UserAuthActions from './../actions/user-auth.action';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs';


@Injectable() 
export class UserAuthEffects {

    constructor(private actions$: Actions) {}

    @Effect() 
    login$: Observable<Action> =  this.actions$
        .ofType(UserAuthActions.ActionTypes.LOGIN)
        .map(() => {
             return {
                 type: UserAuthActions.ActionTypes.LOGIN_SUCCESS,
                 payload: {}
                }
        });
    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(UserAuthActions.ActionTypes.LOGOUT)
        .map(() => {
            return {
                type: UserAuthActions.ActionTypes.LOGOUT_SUCCESS,
                payload: {}
            }
        })    
} 