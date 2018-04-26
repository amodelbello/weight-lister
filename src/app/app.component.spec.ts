import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from './app.module';
import { TestBed, async, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        AppModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
      ],
    }).compileComponents();
  }));
  it('should create the app', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toBe('WeightLister');
    done();
  });
});