import { ServerAuthService } from './../../services/server-auth.service';
import { LoginAction, LogoutAction, ServerLoginAction, ServerLoginSuccessAction, ServerLogoutAction } from './../../actions/user-auth.action';
import { UserProfile } from './../../models/user-profile';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Store } from '@ngrx/store';
import "rxjs/add/operator/let";



@Component({
  selector: 'tr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<UserProfile>;
  authentication$: Observable<any>;
  CLIENT_ID: string = "865ffa528b874fc3b755ee13b9a79037";
  CLIENT_SECRET: string = "72e404fed36d4d779a0fad1411e9e486";
  REDIRECT_URI: string = "http://localhost:4200/instagram_authentication_callback_url";


  constructor(private af: AngularFire, 
              private store: Store<fromRoot.State>,
              private serverAuthService: ServerAuthService) {
    this.user$ = this.store.let(fromRoot.getUserProfile);
    this.authentication$ = this.store.let(fromRoot.getAuthStatus);
    
    // Check if the user is already logged in
    let user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {
      console.log('token is', user_data.auth_token);
      console.log('user is', user_data.user);
      let user = this.serverAuthService.getLoggedInUser(user_data.auth_token);
      user.subscribe(
        // Dispatch login success when the we get the user object
        data => this.store.dispatch(new ServerLoginSuccessAction(data))
        // if required do anyredirects after this
      )
    }
  }

  ngOnInit() {
  }

  login() {
    // Firebase authentication
    // this.store.dispatch(new LoginAction);
    // this.store.dispatch(new ServerLoginAction);
  }

  logout() {
    // Firebase authentication    
    // this.store.dispatch(new LogoutAction);
    this.store.dispatch(new ServerLogoutAction);
  }

  onLoginWithInstagram() {
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=code`;
}

}
