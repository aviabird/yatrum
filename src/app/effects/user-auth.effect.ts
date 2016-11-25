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
        .switchMap(() => this.authService.signIn())
        .filter(data => data !== null)
        .map((data) => {
            let userProfile = this.authService.getUserProfile(data);
            return new UserAuthActions.LoginSuccessAction(userProfile);
        });

    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(UserAuthActions.ActionTypes.LOGOUT)
        .switchMap(() => this.authService.signOut())
        .filter(data => data === null)
        .map(() => {
            return new UserAuthActions.LogoutSuccessAction();
        })    
} 