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
    this.keywordEntered.emit(this.searchQuery);
  }

}
