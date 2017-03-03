import { TravelAppFrontendPage } from './../../../e2e/app.po';
import { UpdateLoginFormNotification } from './../actions/notification.action';
import { Response } from '@angular/http';
import { ServerAuthService } from './../services/server-auth.service';
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
              private serverAuthService: ServerAuthService,
              private store: Store<fromRoot.State>) {}

 @Effect() 
  signup$: Observable<Action> =  this.actions$
    .ofType(UserAuthActions.ActionTypes.SERVER_SIGNUP)
    .switchMap((data) => this.serverAuthService.signUp(data.payload))
    .filter(data => data !== null)
    .map((data) => {
        let userProfile = this.serverAuthService.getServerUserProfile(data);
        return new UserAuthActions.LoginSuccessAction(userProfile);
    });   

  @Effect()
  server_login$: Observable<Action> = this.actions$
    .ofType(UserAuthActions.ActionTypes.SERVER_LOGIN)
    .switchMap((action: Action) => {
      if(action.payload.socialLogin){
        return this.serverAuthService.socialLogin(action.payload.data)
      }
      else{
        return this.serverAuthService.login(action.payload.data)
      }

    })
    .filter(data => data !== null)
    .map((data) => {
      if (typeof(data) === typeof('string')){
        return new UpdateLoginFormNotification('Invalid data');
      }
      else {
        let user = this.serverAuthService.getServerUserProfile(data["user"]);
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