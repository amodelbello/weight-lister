import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageItemLimitComponent } from './page-item-limit.component';

describe('PageItemLimitComponent', () => {
  let component: PageItemLimitComponent;
  let fixture: ComponentFixture<PageItemLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageItemLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageItemLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
