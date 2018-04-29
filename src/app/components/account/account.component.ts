import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { User, AuthUser, emptyUserObject, emptyAuthUserObject } from '../../models/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  authUser: AuthUser = emptyAuthUserObject();
  user: User = emptyUserObject();
  userExists: boolean = true;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.initAuth();
    this.initCurrentUser();
  }

  private initAuth() {
    // Get auth user
    this.authService.getAuth().subscribe(auth => {
      this.authUser.uid = auth.uid;
      this.authUser.email = auth.email;
    });
  }

  private initCurrentUser() {
    // Get user
    this.userService.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
      } else {
        this.userExists = false;
      }
    });
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {

    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: environment.flashMessageDuration });

    } else {

      const userObservable = this.userService.getCurrentUser().subscribe((user) => {

        if (user === null) {
          this.createUser(value);

        } else {
          this.updateUser(value);
          // this.updateAuthUser(value);
        }
      })
    }
  }

  private updateUser(formData) {
    const userFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };
    this.userService.updateUser(userFormData)
    .subscribe(() => {
      this.flashMessage.show('User Updated', { cssClass: 'alert-info', timeout: environment.flashMessageDuration });
    });
  }

  private createUser(formData) {
    formData.id = this.authUser.uid;
    this.userService.createUser(formData)
    .then(() => {
      this.flashMessage.show('User Updated', { cssClass: 'alert-info', timeout: environment.flashMessageDuration });
      this.router.navigate(['/']);
    })
    .catch(e => {
      throw e;
    });
  }

  private updateAuthUser(formData) {

    // TODO: Implementation
    return null;

    // const authFormData = {
    //   email: formData.email,
    // };

    // this.authService.updateAuthUser(authFormData)
    // .then(() => {
    //   this.flashMessage.show('Client Updated', { cssClass: 'alert-info', timeout: environment.flashMessageDuration });
    // })
    // .catch(e => {
    //   throw e;
    // });
  }
}
