import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberToArrayPipe } from '../../../pipes/number-to-array.pipe';

import { PaginationControlsComponent } from './pagination-controls.component';

describe('PaginationControlsComponent', () => {
  let component: PaginationControlsComponent;
  let fixture: ComponentFixture<PaginationControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PaginationControlsComponent,
        NumberToArrayPipe,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('pageClick', () => {
    it('should emit clickEvent event', () => {
      const page = 99;
      spyOn(component.clickEvent, 'emit');
      component.pageClick(page);

      expect(component.clickEvent.emit).toHaveBeenCalledWith(page);
    });
  });
});
