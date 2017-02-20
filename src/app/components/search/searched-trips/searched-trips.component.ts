import { TripsService } from './../../../services/trips.service';
import { Store } from '@ngrx/store';
import { Trip } from './../../../models/trip';
import { Observable } from 'rxjs/Observable';
import {
  Component,
  OnInit,
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/core';
import * as fromRoot from './../../../reducers/index';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'tr-searched-trips',
  templateUrl: './searched-trips.component.html',
  styleUrls: ['./searched-trips.component.scss'],
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
export class SearchedTripsComponent implements OnInit {
  trips$: Observable<Trip[]>;
	authentication$: Observable<boolean>;
  hideLoader: boolean = false;

  constructor(private store: Store<fromRoot.State>, private tripService: TripsService) {

    this.tripService.loading.subscribe(response => {
      this.hideLoader = !response;
    })

    this.trips$ = this.store.select(fromRoot.getTripsCollection)

    this.authentication$ = this.store.select(fromRoot.getAuthStatus);
  }

  ngOnInit() {
  }
}
