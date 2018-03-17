import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(user => {
      if(user) {
        this.isLoggedIn = true;
        this.loggedInUser = user.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    // this.flashMessage.show('You are now logged out', { cssClass: 'alert-info', timeout: environment.flashMessageDuration });
    this.router.navigate(['/login']);
  }
}
