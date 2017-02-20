import { SearchFilterComponent } from './../search-filter/search-filter.component';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-trips-search-filter',
  templateUrl: './trips-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./trips-search-filter.component.scss']
})
export class TripsSearchFilterComponent extends SearchFilterComponent {

}
