import * as fromRoot from './../../../reducers/index';
import { LoadTripsAction } from './../../../actions/trips.action';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TripsService } from './../../../services/trips.service';
import { Trip } from './../../../models/trip';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit {

  trips$: Observable<Trip[]>;

  constructor(private tripsService: TripsService,
              private store: Store<fromRoot.State>) { 

    this.trips$ = this.store.let(fromRoot.getTrips);

  }

  ngOnInit() {
    this.store.dispatch(new LoadTripsAction);
  }

}
