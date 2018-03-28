import { Component, Input, Output, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements AfterViewInit {

  @Input() inputName: string = '';
  @Output() dateChange = new EventEmitter();

  @ViewChild('datetimePicker') datetimePicker: ElementRef;

  constructor() { }

  ngAfterViewInit() {

    let el = this.datetimePicker.nativeElement;
    $(el).datetimepicker();
  }

}
