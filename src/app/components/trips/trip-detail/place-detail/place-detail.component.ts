import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceDetailComponent implements OnInit {

  @Input() place;

  constructor() { }

  ngOnInit() {
  }

}
