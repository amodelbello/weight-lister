import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, FormControl } from '@angular/forms';

import { DatetimePickerComponent } from './datetime-picker.component';
import { on } from 'cluster';
import { VALID } from '@angular/forms/src/model';

describe('DatetimePickerComponent', () => {
  let component: DatetimePickerComponent;
  let fixture: ComponentFixture<DatetimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DatetimePickerComponent 
      ],
      imports: [
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('update()', () => {
    it('should call onChange()', () => {
      const value = 'testValue';
      component.value = value;

      const onChange = spyOn<any>(component, 'onChange');

      component.update();
      expect(onChange).toHaveBeenCalledWith(value);
    });
  });

  describe('setValue()', () => {
    it('should call setValue()', () => {
      const change = 'changeValue';
      spyOn(component, 'update');

      component.setValue(change);
      expect(component.value).toBe(change);
      expect(component.update).toHaveBeenCalled();
    });
  });

  describe('validate()', () => {
    it('should return null if valid', () => {
      const control = new FormControl();
      control.setValue('Tuesday, 06/12/2018, 12:52 PM');

      const result = component.validate(control);
      expect(result).toBeNull();
    });
  });
});
