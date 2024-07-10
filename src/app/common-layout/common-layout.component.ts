import { Component } from '@angular/core';
import { AuthService } from '../quickKart-services/auth/auth.service';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css']
})
export class CommonLayoutComponent {
  isLoggedIn$ = this.authService.isLoggedIn;

  constructor(private authService: AuthService) { }

  logout() {
    debugger;
    console.log('Logout function called');
    this.authService.logout();
  }
}
