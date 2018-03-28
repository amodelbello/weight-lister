import { Component, Input, Output, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements AfterViewInit {

  @Input() value: string = '';
  @Output() dateChange = new EventEmitter();

  @ViewChild('input') input: ElementRef;

  constructor() { }

  ngAfterViewInit() {

    let el = this.input.nativeElement;
    $(el).css('border', '1px solid green');
    console.log('hello2');
    console.log($(el).html());
    $(el).datetimepicker();
  }

}
