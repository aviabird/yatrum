import { LoadTripsAction } from './../../actions/trips.action';
import * as fromRoot from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) { }
  ngOnInit() {
    this.store.dispatch(new LoadTripsAction);    
  }
}
