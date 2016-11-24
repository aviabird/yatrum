import { UserAuthService } from './../services/user-auth.service';
import * as UserAuthActions from './../actions/user-auth.action';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs';


@Injectable() 
export class UserAuthEffects {

    constructor(private actions$: Actions, private authService: UserAuthService) {}

    @Effect() 
    login$: Observable<Action> =  this.actions$
        .ofType(UserAuthActions.ActionTypes.LOGIN)
        
        .switchMap(() => {
            return this.authService.signIn();
          })
        .map((data) => {
            console.log('data from api ', data);
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