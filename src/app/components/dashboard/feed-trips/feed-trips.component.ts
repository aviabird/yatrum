import { Subscription } from 'rxjs/Subscription';
import { TripsService } from './../../../services/trips.service';
import {
  Component,
  OnInit,
  OnDestroy,
  trigger,
  state,
  transition,
  style,
  animate,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Trip } from './../../../models/trip';
import { Store, Action } from '@ngrx/store';
import * as fromRoot from './../../../reducers/index';
import { LoadMoreTripsAction, LoadFeedTripsAction } from './../../../actions/trips.action';
import { Input } from '@angular/core';



@Component({
  selector: 'tr-feed-trips',
  templateUrl: './feed-trips.component.html',
  styleUrls: ['./feed-trips.component.scss'],
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
export class FeedTripsComponent implements OnInit, OnDestroy {
  // @Input() hideLoader: boolean;
  hideLoader: boolean = false;
  subscription: Subscription;
  feedTrips$: Observable<Trip[]>;
  private page: number = 1;

  constructor(private store: Store<fromRoot.State>, private tripService: TripsService) {
    this.tripService.loading.subscribe(response => this.hideLoader = !response);
    this.feedTrips$ = this.store.select(fromRoot.getTripsCollection); 
  }

  ngOnInit() {
    this.store.dispatch(new LoadFeedTripsAction({page: 1, tripsType: "feeds"}));
  }

  onScroll() {
    this.page++;
    let total_pages = this.tripService.total_pages;
    if(this.page <=  total_pages)
      this.store.dispatch(new LoadMoreTripsAction({page: this.page, tripsType: "feeds"}));
  }

  ngOnDestroy() {
  }

}
