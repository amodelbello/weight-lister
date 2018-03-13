import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { StubAuthService } from '../../services/auth.service.stub';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AuthService, useClass: StubAuthService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show app links when logged in', () => {
    component.login();
    fixture.detectChanges();

    const siteLinks = el.querySelectorAll('ul li.nav-item a.nav-link');
    expect(siteLinks[0].innerHTML).toContain('Workouts');
    expect(siteLinks[1].innerHTML).toContain('Exercises');

    const accountLink = el.querySelector('div#account-links a.nav-link');
    expect(accountLink.innerHTML).toContain('Account');
  });

  it('should show login and register links when not logged in', () => {
    component.logout();
    fixture.detectChanges();

    const siteLinks = el.querySelectorAll('ul li.nav-item a.nav-link');
    expect(siteLinks[0].innerHTML).toContain('Login');
    expect(siteLinks[1].innerHTML).toContain('Register');
  });

});