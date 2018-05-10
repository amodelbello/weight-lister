import { Component, ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { LoadingDirective } from './loading.directive';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Component({
  template: `
    <div *loading="true">
      <p>Should not see this. Should see a spinner</p>
    </div>
    <div *loading="false">
      <p>Not loading. Showing content.</p>
    </div>
  `
})
class TestComponent {}

describe('Directive: LoadingDirective', () => {
  let fixture: ComponentFixture<any>;
  let el: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        LoadingDirective, 
        TestComponent,
        SpinnerComponent,
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          SpinnerComponent,
        ]
      }
    })
    .createComponent(TestComponent);
    el = fixture.nativeElement as DebugElement;
    fixture.detectChanges();
  });

  afterEach(() => { fixture = null; });

  it('should show spinner when loading.', () => {
    expect(el['innerText']).not.toContain('Should not see this. Should see a spinner');
  });

  it('should not show spinner when not loading.', () => {
    expect(el['innerText']).toContain('Not loading. Showing content.');
  });
});
