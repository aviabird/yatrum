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

  getTrip(id: string): boolean {
		this.store.dispatch(new fromTripActions.SelectTripAction(id));

		// TODO: first fetch trip from store, if trip is not found, then make an
		// backend api request and store it, then resolve this request.
		// Pivotal tracker link: https://www.pivotaltracker.com/story/show/135508621
		
		// this.store.select(fromRoot.getSelectedTripId)
		// 	.filter((data) => data!= null)
		// 	.map((data) => {
		// 		let trip$ = this.store.select(fromRoot.getSelectedTrip);
		// 		trip$.subscribe(data => {
		// 			if (typeof(data) !== typeof({})) {
		// 				console.log("before");
		// 				this.loadTripApi(id)
		// 					.then(data => {
		// 						console.log("inside");
		// 						this.store.dispatch(new fromTripActions.TripsLoadedAction(data));
		// 					})
		// 				console.log("after");	
		// 			}
		// 		})	
		// 	}).subscribe();

			return true;
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get(`${this.apiLink}/trips.json`)
      .map((data: Response) => data.json())
  }

	getUserTrips(id: string): Observable<Trip[]> {
		return this.http.get(`${this.apiLink}/${id}/trips.json`)
			.map((data: Response) => data.json())
	}

}
