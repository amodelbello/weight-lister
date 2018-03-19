import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NumberToArrayPipe } from '../../pipes/number-to-array.pipe';

@Component({
  selector: 'app-pagination-controls',
  templateUrl: './pagination-controls.component.html',
  styleUrls: ['./pagination-controls.component.scss']
})
export class PaginationControlsComponent implements OnInit {

  @Input() numberOfPages: number;
  @Input() currentPage: number;
  @Output() clickEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  pageClick(page: number) {
    this.clickEvent.emit(page);
  }

}
