import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../../reducers/index';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';


@Component({
  selector: 'tr-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css'], 
})
export class TripDetailComponent {

  userId$: Observable<string>;
  userName$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.userId$ = this.store.select(fromRoot.getTripUserId);
    this.userName$ = this.store.select(fromRoot.getTripUserName);
  }

}
