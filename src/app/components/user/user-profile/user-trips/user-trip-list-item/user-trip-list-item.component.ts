import { TripListItemComponent } from './../../../../shared/trips/trip-list-item/trip-list-item.component';
import {
  Component,
  OnInit,
  trigger,
  state,
  transition,
  style,
  animate
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
    ])
  ]
})
export class UserTripListItemComponent extends TripListItemComponent {

}
