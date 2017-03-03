import { SearchTrip } from './../../actions/trips.action';
import { Router } from '@angular/router';
import { ServerLoginSuccessAction, ServerLogoutAction } from './../../actions/user-auth.action';
import { ServerAuthService } from './../../services/server-auth.service';
import { UserProfile } from './../../models/user-profile';
import * as fromRoot from './../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import "rxjs/add/operator/let";



@Component({
  selector: 'tr-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss'],
  host: {
    '(window:scroll)': 'updateHeader($event)'
  }
})
export class HeaderComponent implements OnInit {
  user$: Observable<UserProfile>;
  authentication$: Observable<any>;
  isScrolled = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 100;

  constructor(
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

  updateHeader(evt) {
      this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
      if(this.currPos >= this.changePos ) {
          this.isScrolled = true;
      } else {
          this.isScrolled = false;
      }
  }

  logout() {
    this.store.dispatch(new ServerLogoutAction());
  }

}
