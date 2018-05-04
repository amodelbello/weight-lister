import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2'
import { AngularFirestore } from 'angularfire2/firestore';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from '../../../environments/environment';

import { AuthService} from '../../services/auth/auth.service';
import { StubAuthService } from '../../services/auth/auth.service.stub';
import { UserService } from '../../services/user/user.service';
import { StubUserService } from '../../services/user/user.service.stub';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let flashMessageService: FlashMessagesService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoginComponent 
      ],
      imports: [
        FormsModule,
      ],
      providers: [
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: FlashMessagesService, useClass: class { show = jasmine.createSpy('show'); }},
        { provide: UserService, useClass: StubUserService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: AngularFireAuth, useClass: class {}},
        { provide: AngularFirestore, useClass: class {}},
        FirebaseApp,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    flashMessageService = TestBed.get(FlashMessagesService);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('should navigate to home page after successfully logging in', fakeAsync(() => {
      spyOn(authService, 'login').and.returnValue(Promise.resolve('success'));

      component.onSubmit();
      tick();

      expect(authService.login).toHaveBeenCalledWith(component.email, component.password);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));

    it('should show flash message after unsuccessful login attempt', fakeAsync(() => {
      spyOn(authService, 'login').and.returnValue(Promise.reject('failure'));

      component.onSubmit();
      tick();

      expect(authService.login).toHaveBeenCalledWith(component.email, component.password);
      expect(flashMessageService.show).toHaveBeenCalledWith(
        'Invalid username/password', 
        { cssClass: 'alert-warning', timeout: environment.flashMessageDuration }
      );
    }));
  });
});
