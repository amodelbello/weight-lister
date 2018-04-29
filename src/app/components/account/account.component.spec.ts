import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('should should error if form is not valid', () => {

      const data = { value: 'data', valid: false };
      component.onSubmit(data);

      expect(component.getFlashMessageObject().show).toHaveBeenCalledWith(
        'Please fill out the form correctly', 
        { cssClass: 'alert-danger', timeout: environment.flashMessageDuration }
      );
    });

    // it('should create a new user', () => {
    // });

    // it('should update an existing user', () => {
    // });
  });
});
