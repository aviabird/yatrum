import { LoginAction, LogoutAction } from './../../actions/user-auth.action';
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
  auth$: Observable<any>;
  authentication$: Observable<boolean>;

  constructor(private af: AngularFire, private store: Store<fromRoot.State>) {
    this.auth$ = this.af.auth;
    this.user$ = this.store.let(fromRoot.getUserProfile);
    this.authentication$ = this.store.let(fromRoot.getAuthStatus);
  }

  

  ngOnInit() {
    this.auth$.subscribe(
      data => {
        //  dispath action auth changed
        console.log('data', data);
      });
  }

  login() {
    this.store.dispatch(new LoginAction);
    // this.af.auth.login({
    //   provider: AuthProviders.Google,
    //   method: AuthMethods.Popup
    // })
  }

  logout() {
    // this.af.auth.logout();
    this.store.dispatch(new LogoutAction);
  }



}
