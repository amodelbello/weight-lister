import * as Rx from 'rxjs/Rx';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
  let authService: AuthService;
  let router: Router;
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
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('call ngOnInit when not logged in', fakeAsync(() => {
      spyOn(authService, 'getAuth').and.returnValue(Rx.Observable.of(null));

      component.ngOnInit();
      tick();

      expect(component.isLoggedIn).toBeFalsy();
    }));
  });

  describe('logout()', () => {
    it('should logout and navigate to login page', () => {
      spyOn(authService, 'logout');

      component.logout();
      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});