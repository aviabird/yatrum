import { environment } from './../../environments/environment';
import * as fromTripActions from './../actions/trips.action';
import * as fromRoot from './../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Trip } from './../models/trip';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastyService } from 'ng2-toasty';
import { ServerAuthService } from './server-auth.service';
import { getSelectedTrip } from '../reducers/index';

@Injectable()
export class TripsService {
	private trips: Trip[] = [];
	private auth_token: string;
	private apiLink: string = environment.API_ENDPOINT; // "http://localhost:3000";
	public total_pages: number;
	// trips: Trip[];
	constructor(
		private http: Http,
		private store: Store<fromRoot.State>,
		private slimLoadingBarService: SlimLoadingBarService,
		private toastyService: ToastyService,
		private authSerive: ServerAuthService
	) {
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
		let subs = this.store.select(getSelectedTrip)
			.do(trip => {
				if (!trip) {
					this.http.get(`${this.apiLink}/trips/${id}`)
						.map((data: Response) => data.json())
						.map(trip => this.store.dispatch(new fromTripActions.TripsLoadedAction([trip])))
						.subscribe();
				}
				this.store.dispatch(new fromTripActions.SelectTripAction(id));
			}).subscribe();
		
		subs.unsubscribe();
		return true;

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
	}

	/**
	 * Get all trips for dashboard page
	 * @method getTrips 
	 * @param 
	 * @return {Observable} Observable of array of trips
	 */
	getTrips(pageParams): Observable<Trip[]> | Observable<String> {
		this.slimLoadingBarService.start();
		return this.http.get(`${this.apiLink}/trips.json/?page=${pageParams['page']}`)
			.map((data: Response) => {
				let trips_data = data.json();
				this.total_pages = trips_data.total_pages;
				return trips_data.trips;
			})
			.catch((res: Response) => this.catchError(res))
			.finally(() => this.slimLoadingBarService.complete());
	}

	/**
	 * Get all trips for search page
	 * @method searchTrips 
	 * @param 
	 * @return {Observable} Observable of array of trips
	 */
	searchTrips(searchQuery): Observable<Trip[]> | Observable<String> {
		this.slimLoadingBarService.start();
		return this.http.post(`${this.apiLink}/trips/search`, { keywords: searchQuery })
			.map((data: Response) => data.json())
			.catch((res: Response) => this.catchError(res))
			.finally(() => this.slimLoadingBarService.complete());
	}

	/**
	 * Get all trips of a particular user
	 * @method getUserTrip 
	 * @param {String} user id 
	 * @return {Observable} Observable with array of user trip objects
	 */
	getUserTrips(id: string): Observable<Trip[]> | Observable<String> {
		this.slimLoadingBarService.start();
		return this.http.get(`${this.apiLink}/users/${id}/trips.json`)
			.map((data: Response) => data.json())
			.catch((res: Response) => this.catchError(res))
			.finally(() => this.slimLoadingBarService.complete());
	}

	/**
	 * Save a trip 
	 * @method saveTrip
	 * @param {Trip} Trip object to be saved
	 * @return {Observable} Observable with created trip object
	 */
	saveTrip(trip: Trip): Observable<Trip> | Observable<String> {
		console.log('we are saving trip', trip);
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': this.auth_token
			// use Restangular which creates interceptor
		});

		return this.http.post(`${this.apiLink}/trips.json`,
			JSON.stringify({ trip: trip }), { headers: headers }
		)
			.map((data: Response) => data.json())
			.catch((res: Response) => this.catchError(res));
	}

	/**
	 * Update trip data 
	 * @method udpateTrip
	 * @param {Trip} trip object to be updated
	 * @return {Observable} Observable with updated trip object
	 */
	updateTrip(trip: Trip): Observable<Trip> | Observable<String> {
		console.log("upadating trip", trip);
		const tripId = trip.id;
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': this.auth_token
			// use Restangular which creates interceptor
		});

		return this.http.patch(`${this.apiLink}/trips/${tripId}.json`,
			JSON.stringify({ trip: trip }), { headers: headers }
		)
			.map((data: Response) => data.json())
			.catch((res: Response) => this.catchError(res));
	}

	/**
	 * User Like/Dislikes trip 
	 * @method likeTrip
	 * @param {string} tripId of trip
	 * @return {Observable} Observable with updated trip object
	 */
	likeTrip(tripId: string): Observable<Trip> | Observable<String> {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': this.auth_token
			// use Restangular which creates interceptor
		});

		return this.http.post(`${this.apiLink}/trips/like.json`,
			{ id: tripId }, { headers: headers }
		)
			.map((data: Response) => data.json())
			.catch((res: Response) => this.catchError(res));
	}

	catchError(response: Response): Observable<String> {
		if (response.status == 401) {
			this.authSerive.redirectToLogin();
			this.toastyService.warning({ title: "Login", msg: "You need to login." });
		} else {
			this.toastyService.error({ title: "Server Error", msg: "Something went wrong !!!" });
		}
		console.log('in catch error method');
		// not returning throw as it raises an error on the parent observable 
		// MORE INFO at https://youtu.be/3LKMwkuK0ZE?t=24m29s    
		return Observable.of('server error');
	}
}
