import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchFieldComponent } from './search-field.component';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SearchFieldComponent 
      ],
      imports: [
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searchTermEntered()', () => {
    it('should emit onSearch event', () => {
      const term = 'searchTermValue';
      spyOn(component.onSearch, 'emit');

      component.searchTermEntered(term);
      expect(component.onSearch.emit).toHaveBeenCalledWith(term);
    });
  });

  describe('searchTermCleared()', () => {
    it('should emit onClear event', () => {
      spyOn(component.onClear, 'emit');

      component.searchTermCleared()
      expect(component.onClear.emit).toHaveBeenCalledWith(component.field);
    });
  });
});
