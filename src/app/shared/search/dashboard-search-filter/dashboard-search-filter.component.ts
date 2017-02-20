import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

@Component({
  selector: 'tr-dashboard-search-filter',
  templateUrl: './dashboard-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard-search-filter.component.scss']
})
export class DashboardSearchFilterComponent extends SearchFilterComponent {

}
