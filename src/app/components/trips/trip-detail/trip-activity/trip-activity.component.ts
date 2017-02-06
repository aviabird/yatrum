import { LoadMediaAction } from './../../../../actions/instagram.action';
import { City } from './../../../../models/city';
import { Place } from './../../../../models/place';
import * as fromRoot from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { Trip } from './../../../../models/trip';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'tr-trip-activity',
	templateUrl: './trip-activity.component.html',
	styleUrls: ['./trip-activity.component.scss']
})
export class TripActivityComponent implements OnInit {
	selectedTrip$: Observable<any>;

	constructor(private store: Store<fromRoot.State>) {
		console.log("trip activity");
		this.selectedTrip$ = this.store.select(fromRoot.getSelectedTrip);
	}

	ngOnInit() {
	}
}
