import { TravelAppFrontendPage } from './../../../e2e/app.po';
import { UpdateLoginFormNotification } from './../actions/notification.action';
import { Response } from '@angular/http';
import { ServerAuthService } from './../services/server-auth.service';
import { UserAuthService } from './../services/user-auth.service';
import * as UserAuthActions from './../actions/user-auth.action';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import 'rxjs';


@Injectable() 
export class UserAuthEffects {

    constructor(private actions$: Actions, 
                private authService: UserAuthService,
                private serverAuthService: ServerAuthService,
                private store: Store<fromRoot.State>) {}

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
        .map(() => new UserAuthActions.LogoutSuccessAction());

    @Effect()
    server_login$: Observable<Action> = this.actions$
        .ofType(UserAuthActions.ActionTypes.SERVER_LOGIN)
        .switchMap((data) => this.serverAuthService.login(data.payload))
        .filter(data => data !== null)
        .map((data) => {
            if (typeof(data) === typeof('string')){
                return new UpdateLoginFormNotification('Invalid data');
            }
            else {
                let user = this.serverAuthService.getServerUserProfile(data); 
                return new UserAuthActions.ServerLoginSuccessAction(user);
            }
        });
        //.catch(this.catchError);
        // Should never catch here it'll lead to this observable dieing in the end
        // not a desired behaviour

    @Effect()
    server_logout$: Observable<Action> = this.actions$
        .ofType(UserAuthActions.ActionTypes.SERVER_LOGOUT)
        .switchMap(() => this.serverAuthService.signOut())
        .map(() => new UserAuthActions.ServerLogoutSuccessAction());  
} 