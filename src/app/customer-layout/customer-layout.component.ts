import { Component } from '@angular/core';
import { AuthService } from '../quickKart-services/auth/auth.service';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent {
  constructor(private authService: AuthService) { }

  isLoggedIn$ = this.authService.isLoggedIn;

  logout() {
    this.authService.logout();
  }
}
