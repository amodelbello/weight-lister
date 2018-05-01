import * as Rx from 'rxjs/Rx';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2'
import { AngularFirestore } from 'angularfire2/firestore';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService} from '../../services/auth/auth.service';
import { StubAuthService } from '../../services/auth/auth.service.stub';
import { UserService } from '../../services/user/user.service';
import { StubUserService } from '../../services/user/user.service.stub';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let rootElement: DebugElement;
  let flashMessage: FlashMessagesService;
  let userService: UserService;
  let formData: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent ],
      imports: [
        FormsModule,
      ],
      providers: [
        { provide: FlashMessagesService, useClass: class { show = jasmine.createSpy('show'); }},
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        { provide: UserService, useClass: StubUserService },
        { provide: AuthService, useClass: StubAuthService },
        { provide: AngularFireAuth, useClass: class {}},
        { provide: AngularFirestore, useClass: class {}},
        FirebaseApp,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
    flashMessage = TestBed.get(FlashMessagesService);
    userService = TestBed.get(UserService);
    formData = { 
      value: {
        firstName: 'Irving',
        lastName: 'Washington',
      }, 
      valid: true 
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('should error if form is not valid', () => {

      const data = { value: 'data', valid: false };
      component.onSubmit(data);

      expect(flashMessage.show).toHaveBeenCalledWith(
        'Please fill out the form correctly', 
        { cssClass: 'alert-danger', timeout: environment.flashMessageDuration }
      );
    });

    it('should create a new user', fakeAsync(() => {
      spyOn(userService, 'getCurrentUser').and.returnValue(Rx.Observable.of(null));

      component.onSubmit(formData);
      tick();

      expect(flashMessage.show).toHaveBeenCalledWith(
        'User Updated', 
        { cssClass: 'alert-info', timeout: environment.flashMessageDuration }
      );
    }));

    it('should throw error if createUser promise is rejected', fakeAsync(() => {
      spyOn(userService, 'getCurrentUser').and.returnValue(Rx.Observable.of(null));
      spyOn(userService, 'createUser').and.returnValue(Promise.reject('problem'));

      component.onSubmit(formData);
      tick();

      expect(component.onSubmit).toThrow();
    }));

    it('should update an existing user', fakeAsync(() => {
      spyOn(userService, 'getCurrentUser').and.returnValue(Rx.Observable.of(formData.value));

      component.onSubmit(formData);
      tick();

      expect(flashMessage.show).toHaveBeenCalledWith(
        'User Updated', 
        { cssClass: 'alert-info', timeout: environment.flashMessageDuration }
      );
    }));
  });

  describe('ngOnInit()', () => {
    it('should set userExists to false if current user does not exist', fakeAsync(() => {
      expect(component.userExists).toBe(true);
      spyOn(userService, 'getCurrentUser').and.returnValue(Rx.Observable.of(null));

      component.ngOnInit();
      tick();

      expect(component.userExists).toBe(false);
    }));
  });
});
