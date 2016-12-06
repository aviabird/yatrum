import * as fromTripActions from './../actions/trips.action';
import * as fromRoot from './../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Trip } from './../models/trip';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TripsService {
  private trips: Trip[] = [];
  private auth_token: string;
  private apiLink:string = "http://localhost:3000";
  // trips: Trip[];
  constructor(private http: Http, private store: Store<fromRoot.State>) {
    //TODO: Move this out at a later stage for logged in user
    let user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {
      this.auth_token = user_data.auth_token;
    }
  }

  getTrip(id: string) {
		this.store.dispatch(new fromTripActions.SelectTripAction(id));
    
  }

  getTrips(): Observable<any>{
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    //TODO: Headers not required for this route
    return this.http.get(`${this.apiLink}/trips.json`, {headers: headers})
      .map((data) => data.json())
  }

}
