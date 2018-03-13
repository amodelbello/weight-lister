import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() loggedId: boolean;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // this.logout();
    this.login();
  }

  login() {
    this.authService.login();
    this.loggedId = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.loggedId = this.authService.isLoggedIn();
  }

  isLoggedIn() {
    return this.loggedId;
  }
}
