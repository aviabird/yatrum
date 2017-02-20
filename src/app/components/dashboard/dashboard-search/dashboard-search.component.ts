import { Router } from '@angular/router';
import { SearchTrip } from './../../../actions/trips.action';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  trigger,
  state,
  transition,
  style,
  animate,
  ChangeDetectionStrategy
} from '@angular/core';
import * as fromRoot from './../../../reducers/index';
import { LoadFeedTripsAction } from '../../../actions/trips.action';

@Component({
  selector: 'tr-dashboard-search',
  templateUrl: './dashboard-search.component.html',
  styleUrls: ['./dashboard-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInDown', [
      state('in', style({ })),
      transition('void => *', [
        style({ top: "-5%", opacity: 0 }),
        animate(500)
      ])
    ])
  ]
})
export class DashboardSearchComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new LoadFeedTripsAction({page: 1, tripsType: "feeds"}));
  }

  onSearch(searchQuery){
    this.router.navigate(['/search']);
    
    if(searchQuery != "")
      this.store.dispatch(new SearchTrip(searchQuery));
    else
      this.store.dispatch(new LoadFeedTripsAction({page: 1, tripsType: "feeds"}));
  }

}
