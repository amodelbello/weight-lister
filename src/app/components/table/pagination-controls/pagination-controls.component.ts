import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
    console.log('from pagination controls: ' + this.numberOfPages);
  }

  pageClick(page: number) {
    this.clickEvent.emit(page);
  }

}
