import { ServerAuthService } from './../../services/server-auth.service';
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
  authentication$: Observable<any>;

  constructor(private af: AngularFire, 
              private store: Store<fromRoot.State>,
              private serverAuthService: ServerAuthService) {
    this.user$ = this.store.let(fromRoot.getUserProfile);
    this.authentication$ = this.store.let(fromRoot.getAuthStatus);
  }

  

  ngOnInit() {
  }

  login() {
    this.store.dispatch(new LoginAction);
  }

  logout() {
    this.store.dispatch(new LogoutAction);
  }



}
