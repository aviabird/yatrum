import { environment } from './../../environments/environment';
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
  private apiLink:string = environment.API_ENDPOINT; // "http://localhost:3000";
  // trips: Trip[];
  constructor(private http: Http, private store: Store<fromRoot.State>) {
    //TODO: Move this out at a later stage for logged in user
    let user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {
      this.auth_token = user_data.auth_token;
    }
  }

	/**
	 * Get details of a particular trip
	 * @method getTrip
	 * @param {String} Trip id
	 * @return {Boolean} CS:?
	 */
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

	/**
	 * Get all trips for dashboard page
	 * @method getTrips 
	 * @param 
	 * @return {Observable} Observable of array of trips
	 */
  getTrips(): Observable<Trip[]>|Observable<String> {
    return this.http.get(`${this.apiLink}/trips.json`)
      .map((data: Response) => data.json())
			.catch(this.catchError);
  }

	/**
	 * Get all trips of a particular user
	 * @method getUserTrip 
	 * @param {String} user id 
	 * @return {Observable} Observable with array of user trip objects
	 */
	getUserTrips(id: string): Observable<Trip[]>|Observable<String> {
		return this.http.get(`${this.apiLink}/users/${id}/trips.json`)
			.map((data: Response) => data.json())
			.catch(this.catchError);
	}

	/**
	 * Save a trip 
	 * @method saveTrip
	 * @param {Trip} Trip object to be saved
	 * @return {Observable} Observable with created trip object
	 */
	saveTrip(trip: Trip): Observable<Trip>|Observable<String> {
		console.log('we are saving trip');
		const headers = new Headers({
      'Content-Type': 'application/json', 
			'Authorization': this.auth_token
			// use Restangular which creates interceptor
    });

		return this.http.post(`${this.apiLink}/trips.json`, 
			JSON.stringify({trip: trip}), {headers: headers}
		)
		.map((data: Response) => data.json())
		.catch(this.catchError);
	}

	/**
	 * Update trip data 
	 * @method udpateTrip
	 * @param {Trip} trip object to be updated
	 * @return {Observable} Observable with updated trip object
	 */
	updateTrip(trip: Trip): Observable<Trip>|Observable<String> {
		const tripId = trip.id; 
		const headers = new Headers({
      'Content-Type': 'application/json',
			'Authorization': this.auth_token 
			// use Restangular which creates interceptor
    });

		return this.http.patch(`${this.apiLink}/trips/${tripId}.json`,
			JSON.stringify({trip: trip}), {headers: headers}
		)
		.map((data: Response) => data.json())
		.catch(this.catchError);
	}

	catchError(response: Response): Observable<String> {
      console.log('in catch error method');
      // not returning throw as it raises an error on the parent observable 
      // MORE INFO at https://youtu.be/3LKMwkuK0ZE?t=24m29s    
      return Observable.of('server error');
  }
}
