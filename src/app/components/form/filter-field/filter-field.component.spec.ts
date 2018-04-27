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
});
