import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login();
    this.flashMessage.show('You have successfully logged in', { cssClass: 'alert-dark', timeout: 4000});
    this.router.navigate(['/']);
  }
}
