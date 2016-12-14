import { LoadTripsAction } from './../../../actions/trips.action';
import * as fromRoot from './../../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Trip } from './../../../models/trip';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'tr-trips-list',
	templateUrl: './trips-list.component.html',
	styleUrls: ['./trips-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent {
	trips$: Observable<Trip[]>;

	constructor(private store: Store<fromRoot.State>) { 
		this.store.dispatch(new LoadTripsAction);
		this.trips$ = this.store.select(fromRoot.getTripsCollection);
	}  
}
