import { ServerAuthService } from './../services/server-auth.service';
import { UserAuthService } from './../services/user-auth.service';
import * as UserAuthActions from './../actions/user-auth.action';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs';


@Injectable() 
export class UserAuthEffects {

    constructor(private actions$: Actions, 
                private authService: UserAuthService,
                private serverAuthService: ServerAuthService) {}

    @Effect() 
    login$: Observable<Action> =  this.actions$
        .ofType(UserAuthActions.ActionTypes.LOGIN)
        .switchMap(() => { 
            console.log('login action')
            return this.authService.signIn()})
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
        });

    @Effect()
    server_login$: Observable<Action> = this.actions$
        .ofType(UserAuthActions.ActionTypes.SERVER_LOGIN)
        .switchMap((data) => { 
            console.log("Data in server action", data.payload);
            return this.serverAuthService.login(data.payload);
        })
        .filter(data => { 
            console.log('data in filter', data);
            return data !== null
        })
        .map((data) => {
            console.log('data received', data);
            let user = this.serverAuthService.getServerUserProfile(data); 
            return new UserAuthActions.ServerLoginSuccessAction(user);
        });

    @Effect()
    server_logout$: Observable<Action> = this.actions$
        .ofType(UserAuthActions.ActionTypes.SERVER_LOGOUT)
        .switchMap(() => this.serverAuthService.signOut())
        .map(() => {
            return new UserAuthActions.ServerLogoutSuccessAction();
        });        
} 