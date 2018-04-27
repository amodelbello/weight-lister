import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashMessagesModule } from 'angular2-flash-messages'
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth/auth.service';
import { StubAuthService } from '../../services/auth/auth.service.stub';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HeaderComponent 
      ],
      imports: [
        FlashMessagesModule,
      ],
      providers: [
        { provide: AuthService, useClass: StubAuthService },
        { provide: AngularFireAuth, useClass: class {}},
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        FlashMessagesService,
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

  it('should be able to tell whether or not the user is logged in', () => {
    // let authService = TestBed.get(AuthService);

    // authService.login();
    // expect(component.isLoggedIn()).toBe(true);

    // authService.logout();
    // expect(component.isLoggedIn()).toBe(false);
  });

});