import { TripsService } from './../services/trips.service';
import * as fromTripActions from './../actions/trips.action';
import * as fromRoot from './../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Trip } from './../models/trip';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class TripsResolveGuard implements Resolve<boolean>{

	constructor(private store: Store<fromRoot.State>,
		private router: Router,
		private tripsService: TripsService) {
	}

	resolve(route: ActivatedRouteSnapshot): boolean {
		let tripIndex = route.params['id'];
		if(tripIndex)
			return this.tripsService.getTrip(tripIndex);
	}
}
