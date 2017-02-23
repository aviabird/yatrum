import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import * as moment from 'moment/moment';

@Component({
  selector: 'tr-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceDetailComponent implements OnInit {

  @Input() place;
  date: string;
  time: string;


  constructor() { }

  ngOnInit() {
    let date = this.place.visited_date;
    date = new Date(date);
    this.date = moment(date).format("D MMM YY");
    this.time = moment(date).format('LT');
  }

}
