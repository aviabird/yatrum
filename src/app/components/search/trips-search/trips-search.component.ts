import { Router } from '@angular/router';
import { LoadTripsAction, SearchTrip } from './../../../actions/trips.action';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import * as fromRoot from './../../../reducers/index';

@Component({
  selector: 'tr-trips-search',
  templateUrl: './trips-search.component.html',
  styleUrls: ['./trips-search.component.scss']
})
export class TripsSearchComponent {

  constructor(private store: Store<fromRoot.State>, private router: Router) { }

  ngOnInit() {
  }

  onSearch(searchQuery){
    if(searchQuery != "")
      this.store.dispatch(new SearchTrip(searchQuery))
    else
      this.store.dispatch(new LoadTripsAction)
  }

}
