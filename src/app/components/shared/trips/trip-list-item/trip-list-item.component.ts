import { Trip } from './../../../../models/trip';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../../../reducers';
import { SearchTrip, LoadTripsAction } from '../../../../actions/trips.action';
import { UserProfile } from '../../../../models/user-profile';
import { UserAuthService } from '../../../../services/user-auth.service';
import {
  Component,
  OnInit,
  trigger,
  state,
  transition,
  style,
  animate,
  Input
} from '@angular/core';

@Component({
  selector: 'tr-trip-list-item',
  templateUrl: './trip-list-item.component.html',
  styleUrls: ['./trip-list-item.component.scss'],
  animations: [
    trigger('flyInUp', [
      state('in', style({ transform: "translateY(0)" })),
      transition('void => *', [
        style({ transform: "translateY(100%)" }),
        animate(500)
      ])
    ]),
    trigger('toggleLike', [
      state('inactive', style({})),
      state('active', style({
        color: 'rgba(255, 5, 5, 0.6)',
        opacity: 1,
        transform: "scale(1.0)"
      })),
      transition('inactive => active', [
        style({ transform: "scale(3.0)", opacity: 0, color: 'red' }),
        animate(500)
      ]),
      transition('active => inactive', animate(500))
    ]),
    trigger('toggleFollow', [
      state('inactive', style({})),
      state('active', style({
        background: 'rgba(255, 5, 5, 0.6)',
        opacity: 1,
        transform: "scale(1) translateX(-100%)"
      })),
      transition('inactive => active', [
        style({ transform: "scale(1.2) translateX(-89%)", opacity: 0, background: 'red', right: '2rem' }),
        animate(500)
      ]),
      transition('active => inactive', [
        style({ transform: "scale(1.2) translateX(-89%)", opacity: 0, background: 'red', right: '2rem' }),
        animate(500)
      ])
    ])
  ]
})
export class TripListItemComponent {
  @Input() trip: Trip;
  state: any = {'like': 'inactive', 'follow': 'inactive'};
  
  toggleLike(status) {
    this.state.like = (status === 'inactive' ? 'active' : 'inactive');
  }

  toggleFollowBtn(status) {
    this.state.follow = (status === 'inactive' ? 'active' : 'inactive');
  }

  constructor(
    private router: Router,
    private store: Store<State>,
    private authService: UserAuthService
  ) { }

  onTagClick(searchQuery) {
    this.router.navigate(['/search']);
    
    if(searchQuery != "")
      this.store.dispatch(new SearchTrip(searchQuery))
    else
      this.store.dispatch(new LoadTripsAction)
  }

  belongsToLoggedInUser() {
    return this.authService.belongsToLoggedInUser(this.trip.user_id)
  }

}
