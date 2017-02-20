import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPlaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
