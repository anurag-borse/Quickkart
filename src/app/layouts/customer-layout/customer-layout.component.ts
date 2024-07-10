import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html'
})
export class CustomerLayoutComponent {
  userRole: string|null;
  constructor(private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
  }
  logOut() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    this.router.navigate(['']);
  }
}
