import { LoadMediaAction } from './../../../../actions/instagram.action';
import { City } from './../../../../models/city';
import { Place } from './../../../../models/place';
import * as fromRoot from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { Trip } from './../../../../models/trip';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'tr-trip-activity',
	templateUrl: './trip-activity.component.html',
	styleUrls: ['./trip-activity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripActivityComponent implements OnInit {
	selectedTrip$: Observable<any>;

	constructor(private store: Store<fromRoot.State>) {
		this.selectedTrip$ = this.store.select(fromRoot.getSelectedTrip);
	}

	ngOnInit() {
	}
}
