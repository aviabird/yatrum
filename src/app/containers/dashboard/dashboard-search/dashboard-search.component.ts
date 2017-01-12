import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-dashboard-search',
  templateUrl: './dashboard-search.component.html',
  styleUrls: ['./dashboard-search.component.scss']
})
export class DashboardSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSearch(keyword){
    console.log('dashboard search ', keyword);
  }

}
