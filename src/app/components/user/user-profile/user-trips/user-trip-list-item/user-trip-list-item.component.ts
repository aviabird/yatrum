import { Trip } from './../../../../../models/trip';
import { TripListItemComponent } from './../../../../shared/trips/trip-list-item/trip-list-item.component';
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
  selector: 'tr-user-trip-list-item',
  templateUrl: './user-trip-list-item.component.html',
  styleUrls: ['./user-trip-list-item.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ transform: "translateY(0)" })),
      transition('void => *', [
        style({ transform: "translateY(100%)" }),
        animate(500)
      ])
    ]),
    trigger('onClickToggle', [
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
    ])
  ]
})
export class UserTripListItemComponent extends TripListItemComponent {
  state: string = 'inactive';
  
  toggleMove() {
      this.state = (this.state === 'inactive' ? 'active' : 'inactive');
  }
}
