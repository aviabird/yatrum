import { State, getTripsCollection } from './../../../reducers/index';
import { LoadMoreTripsAction, LoadTrendingTripsAction } from './../../../actions/trips.action';
import { TripsService } from './../../../services/trips.service';
import { Store } from '@ngrx/store';
import { Trip } from './../../../models/trip';
import { Observable } from 'rxjs/Observable';
import { Component, 
  OnInit, 
  trigger,
  state,
  transition,
  style,
  animate,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'tr-trending-trips',
  templateUrl: './trending-trips.component.html',
  styleUrls: ['./trending-trips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class TrendingTripsComponent implements OnInit {
  hideLoader: boolean = false;
  trendingTrips$: Observable<Trip[]>;
  private page: number = 1;

  constructor(private store: Store<State>, private tripService: TripsService) {
    
    this.tripService.loading.subscribe(response => this.hideLoader = !response);

    this.trendingTrips$ = this.store.select(getTripsCollection);
  }

  ngOnInit() {
    this.store.dispatch(new LoadTrendingTripsAction({page: 1, tripsType: "trending"}));
  }
  
  onScroll() {
    this.page++;
    let total_pages = this.tripService.total_pages;
    if(this.page <=  total_pages)
      this.store.dispatch(new LoadMoreTripsAction({page: this.page, tripsType: "trending"}));
  }

}
