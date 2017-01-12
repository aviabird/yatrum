import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tr-search-filter',
  template: ``
})
export class SearchFilterComponent implements OnInit {
  @Input()
  searchQuery = "";

  @Output()
  keywordEntered = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    console.log('base filter', this.searchQuery);
    this.keywordEntered.emit(this.searchQuery);
  }

  onEvent(event) {
    console.log(event);
  }

}
