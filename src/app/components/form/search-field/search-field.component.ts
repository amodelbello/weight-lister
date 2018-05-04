import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {

  @Input() field: string;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClear: EventEmitter<string> = new EventEmitter<string>();
  searchTerm: string;

  constructor() { }

  ngOnInit() {
    console.log(this.field);
  }

  searchTermEntered(term) {
    this.onSearch.emit(term);
  }

  searchTermCleared() {
    this.searchTerm = '';
    this.onClear.emit(this.field);
  }
}
