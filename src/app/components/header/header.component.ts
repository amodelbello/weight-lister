import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private userService: AuthService,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    console.log(`isLoggedIn: ${this.isLoggedIn}`);
  }

}
