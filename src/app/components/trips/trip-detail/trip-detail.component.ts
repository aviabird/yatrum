import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';


@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'], 
})
export class TripDetailComponent {

  trip$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {
    this.trip$ = this.store.select(fromRoot.getSelectedTrip);
  }

}
