import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-item-limit',
  templateUrl: './page-item-limit.component.html',
  styleUrls: ['./page-item-limit.component.scss']
})
export class PageItemLimitComponent implements OnInit {

  constructor() { }

  @Input() pageItemLimit: number;
  @Output() limitChangeEvent: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
  }

  onClick(limit: number) {
    this.limitChangeEvent.emit(limit);
  }

}
