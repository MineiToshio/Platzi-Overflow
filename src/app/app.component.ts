import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzi-overflow';

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  fullName() {
    return this.authService.currentUser.fullName();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
