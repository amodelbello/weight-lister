import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.scss']
})
export class FilterFieldComponent implements OnInit {

  @Input() field: string;
  @Input() selectedTerm: string;
  @Input() fieldList: string[];
  @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClear: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private lss: LocalStorageService,
  ) { }

  ngOnInit() {
  }

  filterTermSelected(term) {
    this.onFilter.emit(term);
  }

  filterTermCleared() {
    this.selectedTerm = '';
    this.onClear.emit(this.field);
  }
}
