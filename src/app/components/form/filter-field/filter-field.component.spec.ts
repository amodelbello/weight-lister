import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

import { FilterFieldComponent } from './filter-field.component';

describe('FilterFieldComponent', () => {
  let component: FilterFieldComponent;
  let fixture: ComponentFixture<FilterFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FilterFieldComponent 
      ],
      providers: [
        LocalStorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filterTermSelected()', () => {
    it('should emit onFilter event', () => {
      const term = 'filterTermValue';
      spyOn(component.onFilter, 'emit');

      component.filterTermSelected(term);
      expect(component.onFilter.emit).toHaveBeenCalledWith(term);
    });
  });

  describe('filterTermCleared()', () => {
    it('should emit onClear event', () => {
      spyOn(component.onClear, 'emit');

      component.filterTermCleared();
      expect(component.selectedTerm).toBe('');
      expect(component.onClear.emit).toHaveBeenCalledWith(component.field);
    });
  });
});
