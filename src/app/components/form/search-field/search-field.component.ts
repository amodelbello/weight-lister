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
  // @ViewChild('searchField') searchField: HTMLInputElement;

  constructor() { }

  ngOnInit() {
    console.log(this.field);
  }

  searchTermEntered(term) {
    console.log('searchTermEntered');
    this.onSearch.emit(term);
  }

  searchTermCleared() {

    console.log('this.field?' + this.field);

    this.searchTerm = '';
    // this.searchField.value = '';
    // this.searchField.set
    this.onClear.emit(this.field);
  }
}
