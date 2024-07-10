import { Component } from '@angular/core';
@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  imageSrc: string
  userRole: string|null;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  constructor() {
    this.imageSrc = 'src/app/quickKart-images/quickKart.png'
    this.userRole = sessionStorage.getItem('userRole');
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
  }
}
