import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.getCurrentUser().map(user => {
      if (user === null) {
        this.router.navigate(['/account']);
        return false;
      } else {
        return true;
      }
    });
  }
}
