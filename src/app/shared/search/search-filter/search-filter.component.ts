import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-search-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
