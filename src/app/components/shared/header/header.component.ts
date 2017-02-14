import { SearchTrip } from './../../../actions/trips.action';
import { Router } from '@angular/router';
import { ServerLoginSuccessAction, ServerLogoutAction } from './../../../actions/user-auth.action';
import { ServerAuthService } from './../../../services/server-auth.service';
import { UserProfile } from './../../../models/user-profile';
import * as fromRoot from './../../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Store } from '@ngrx/store';
import "rxjs/add/operator/let";



@Component({
  selector: 'tr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<UserProfile>;
  authentication$: Observable<any>;

  constructor(private af: AngularFire,
    private store: Store<fromRoot.State>,
    private serverAuthService: ServerAuthService,
    private router: Router
  ) {
    this.user$ = this.store.select(fromRoot.getUserProfile);
    this.authentication$ = this.store.select(fromRoot.getAuthStatus);

    // Check if the user is already logged in
    let user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {
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

}
