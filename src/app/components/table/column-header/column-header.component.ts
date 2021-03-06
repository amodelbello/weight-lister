import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderByDirection } from '@firebase/firestore-types';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
  styleUrls: ['./column-header.component.scss']
})
export class ColumnHeaderComponent implements OnInit {

  constructor() { }

  @Input() label: string;
  @Input() field: string;
  @Input() activeSortField: string;
  @Input() activeSortDirection: OrderByDirection;

  @Output() sortChangeEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  sortClick(field) {
    this.sortChangeEvent.emit(field);
  } 
}
