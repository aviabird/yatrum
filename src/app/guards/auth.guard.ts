import { TripsService } from './../services/trips.service';
import * as fromTripActions from './../actions/trips.action';
import * as fromRoot from './../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Trip } from './../models/trip';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate{
  isAuthenticated: boolean;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
  }

  canActivate() {
    this.store
      .select(fromRoot.getAuthStatus)
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if(!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      })
    
    return this.isAuthenticated;
  }
}
