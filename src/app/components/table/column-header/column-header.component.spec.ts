import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnHeaderComponent } from './column-header.component';

describe('ColumnHeaderComponent', () => {
  let component: ColumnHeaderComponent;
  let fixture: ComponentFixture<ColumnHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sortClick', () => {
    it('should emit sortChangeEvent event', () => {
      const field = 'fieldValue';
      spyOn(component.sortChangeEvent, 'emit');
      component.sortClick(field);

      expect(component.sortChangeEvent.emit).toHaveBeenCalledWith(field);
    });
  });
});
