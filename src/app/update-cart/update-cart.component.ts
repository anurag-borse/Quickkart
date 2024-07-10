import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../quickKart-services/user-service/user.service';

@Component({
  selector: 'app-update-cart',
  templateUrl: './update-cart.component.html',
  styleUrls: ['./update-cart.component.css']
})
export class UpdateCartComponent implements OnInit {
  productId: string = '';
  productName: string = '';
  quantity: number = 1;
  quantityAvailable: number = 0;
  emailId: string = '';
  status: boolean = false;
  errorMsg: string = '';

  constructor(private route: ActivatedRoute, private _userService: UserService, private router: Router) { }

  ngOnInit() {
    this.emailId = sessionStorage.getItem("userName") || '';
    if (this.emailId === '') {
      this.router.navigate(['/login']);
      return;
    }

    this.productId = this.route.snapshot.params['productId'] || '';
    this.productName = this.route.snapshot.params['productName'] || '';
    this.quantity = parseInt(this.route.snapshot.params['quantity'], 10) || 1;
    this.quantityAvailable = parseInt(this.route.snapshot.params['quantityAvailable'], 10) || 0;
  }

  updateCart(qty: number) {
    this._userService.updateCartProduct(this.emailId, this.productId, qty).subscribe(
      responseUpdateCartStatus => {
        this.status = responseUpdateCartStatus;
        if (this.status) {
          alert("Product quantity updated successfully.");
          this.router.navigate(['/viewCart']);
        } else {
          alert("Some error occurred, please try after some time.");
          this.router.navigate(['/viewCart']);
        }
      },
      responseUpdateCartError => {
        this.errorMsg = responseUpdateCartError;
        console.log(this.errorMsg);
        alert("Some error occurred, please try after some time.");
        this.router.navigate(['/viewCart']);
      },
      () => console.log("UpdateCart method executed successfully.")
    );
  }
}
