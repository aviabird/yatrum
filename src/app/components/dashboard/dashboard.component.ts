import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  constructor() {
    document.body.scrollTop = 0;
  }

}
