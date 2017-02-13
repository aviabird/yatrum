import { TripsService } from './../../../services/trips.service';
import {
  Component,
  OnInit,
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Trip } from './../../../models/trip';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers/index';
import { LoadMoreTripsAction } from './../../../actions/trips.action';
import { Input } from '@angular/core';

@Component({
  selector: 'tr-dashboard-trips',
  templateUrl: './dashboard-trips.component.html',
  styleUrls: ['./dashboard-trips.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500)
      ])
    ])
  ]
})
export class DashboardTripsComponent implements OnInit {
  @Input() tripsType: string;
  @Input() trips: Trip[];
  authentication$: Observable<boolean>;
  @Input() hideLoader: boolean;
  private page: number = 1;

  constructor(private store: Store<fromRoot.State>, private tripService: TripsService) {
    this.authentication$ = this.store.select(fromRoot.getAuthStatus);
  }

  ngOnInit() {
  }

  onScroll() {
    this.page++;
    let total_pages = this.tripService.total_pages;
    if(this.page <=  total_pages)
      this.store.dispatch(new LoadMoreTripsAction({page: this.page}));
  }

}
