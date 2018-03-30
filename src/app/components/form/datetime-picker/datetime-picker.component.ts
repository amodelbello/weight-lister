import { forwardRef, Input, Output, ViewChild, ElementRef, OnInit, AfterViewInit, Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatetimePickerComponent),
    multi: true,
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatetimePickerComponent),
    multi: true,
  }]
})
export class DatetimePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  private dateFormat = 'dddd, MM/DD/YYYY, h:mm A';
  exampleDate = moment().format(this.dateFormat);
  regexFormat = /^[\w]{3,}, [\d]{2}\/[\d]{2}\/[\d]{4}, [\d]{1,2}:[\d]{2} [\w]{2}$/;
  private onTouched = () => {};
  private onChange: (value: string) => {};

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  @Input() value: string = '';
  @Input() name: string = '';
  @Input() format: string = this.dateFormat;

  update() {
    this.onChange(this.value);
  }

  setValue(change: string) {
    this.value = change;
    this.update();
  }

  validate(control: FormControl) {

    let valid = false;
    if (control.value !== undefined && control.value !== null) {
      valid = control.value.match(this.regexFormat);
    }

    if (valid) {
      return null;
    } else {
      return { control: { valid: false } };
    }
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {}

  @ViewChild('datetimePicker') datetimePicker;
  @ViewChild('control') datetimeInput;

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.cdRef.detectChanges();

    // container div
    let dtElement = this.datetimePicker.nativeElement;

    // actual text field that holds the date
    let dtInput = this.datetimeInput.nativeElement;

    // format date coming from model
    $(dtInput).val(moment(this.value).format(this.format));

    // init plugin
    $(dtElement).datetimepicker({
      format: this.dateFormat,
    });

    // watch for changes
    let dpChange$ = Observable.fromEvent($(dtElement), 'dp.change')
    .pluck('date');

    let blur$ = Observable.fromEvent($(dtInput), 'blur')
    .pluck('currentTarget', 'value');

    Observable.merge(
      dpChange$,
      blur$
    )
    .map((date: string) => {
      date = moment(date).format(this.format);
      return date;
    })
    .subscribe((date: string) => {
      this.value = date;
      this.update();
    });
  }

}
