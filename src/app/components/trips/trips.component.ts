import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent {
  constructor() {
    document.body.scrollTop = 0;
  }
}
