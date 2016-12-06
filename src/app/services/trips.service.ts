import * as fromTripActions from './../actions/trips.action';
import * as fromRoot from './../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Trip } from './../models/trip';
import { Http, Headers, Response } from '@angular/http';
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
		console.log("get Trip method");

		this.store.select(fromRoot.getSelectedTripId)
			.filter((data) => data!= null)
			.map((data) => {
				let trip$ = this.store.select(fromRoot.getSelectedTrip);
				trip$.subscribe(data => {
					console.log('data present is', data);
					if (typeof(data) !== typeof({})) {
						console.log('we are fetching data');
						this.http.get(`${this.apiLink}/trips/${id}.json`)
							.subscribe(data => {
								console.log('calling api');
								this.store.dispatch(new fromTripActions.TripsLoadedAction(data.json()));
							})
						return Observable.of(true);
					} else{
						return Observable.of(true);
					}
				})	
			});

			return true;
  }

  getTrips(): Observable<any>{
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    //TODO: Headers not required for this route
    return this.http.get(`${this.apiLink}/trips.json`, {headers: headers})
      .map((data: Response) => data.json())
  }

}
