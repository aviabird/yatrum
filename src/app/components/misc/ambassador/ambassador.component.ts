import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-ambassador',
  templateUrl: './ambassador.component.html',
  styleUrls: ['./ambassador.component.scss']
})
export class AmbassadorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.scrollTop = 0;
  }

}
