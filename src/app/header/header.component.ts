import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) {}

  ngOnInit() {
    this.authService.logout();
    // this.authService.login();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.flashMessage.show('You are now logged out', { cssClass: 'alert-dark', timeout: 4000 });
    this.router.navigate(['/login']);
  }
}
