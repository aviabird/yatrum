import * as fromRoot from './../../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Trip } from './../../../models/trip';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { LoadFeedTripsAction } from '../../../actions/trips.action';

@Component({
  selector: 'tr-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent {
  trips$: Observable<Trip[]>;
	authentication$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.trips$ = this.store.select(fromRoot.getTripsCollection);
    this.authentication$ = this.store.select(fromRoot.getAuthStatus);
  }

  ngOnInit() {
    this.store.dispatch(new LoadFeedTripsAction({page: 1}));
  }
}
