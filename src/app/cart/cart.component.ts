import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/quickKart-services/cart-service/cart.service';
import { ICartProduct } from 'src/app/quickKart-interfaces/cartproduct';
import { AuthService } from '../quickKart-services/auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: ICartProduct[] = [];
  showMsgDiv: boolean = false;
  userRole: string | null;
  customerLayout: boolean = false;
  commonLayout: boolean = false;

  constructor(private cartService: CartService, private authService: AuthService) {
    this.userRole = sessionStorage.getItem('userRole');
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    } else {
      this.commonLayout = true;
    }
  }

  ngOnInit(): void {
    this.authService.getCurrentUserEmail().subscribe((email: string | null) => {
     
      if (email) {
        this.cartService.getCartProducts(email).subscribe(
          (data: ICartProduct[]) => {
            this.cartProducts = data;
            this.showMsgDiv = this.cartProducts.length === 0;
          },
          (error) => {
            console.error(error);
            this.showMsgDiv = true;
          }
        );
      }
    });
  }
}
