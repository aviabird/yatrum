import { Router } from '@angular/router';
import { SearchTrip, LoadTripsAction } from './../../../actions/trips.action';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from './../../../reducers/index';

@Component({
  selector: 'tr-dashboard-search',
  templateUrl: './dashboard-search.component.html',
  styleUrls: ['./dashboard-search.component.scss']
})
export class DashboardSearchComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new LoadTripsAction);
  }

  onSearch(searchQuery){
    this.router.navigate(['/search']);
    
    if(searchQuery != "")
      this.store.dispatch(new SearchTrip(searchQuery))
    else
      this.store.dispatch(new LoadTripsAction)
  }

}
