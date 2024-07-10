import { Component, OnInit } from '@angular/core';
import { IPurchase } from '../../app/quickKart-interfaces/purchase';
import { PurchaseService } from '../quickKart-services/purchase-service/purchase.service';
import { AuthService } from '../quickKart-services/auth/auth.service'; 

@Component({
  selector: 'app-view-purchases',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})

export class ViewPurchasesComponent implements OnInit {
  purchases!: IPurchase[];
  showMsgDiv: boolean = false;
  errMsg!: string;

  constructor(private purchaseService: PurchaseService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUserEmail().subscribe(email => {
      if (email) {
        this.getPurchases(email);
      }
    });
  }

  getPurchases(customerEmail: string) {
    this.purchaseService.getPurchasesByEmail(customerEmail).subscribe(
      responsePurchaseData => {
        this.purchases = responsePurchaseData;
        this.showMsgDiv = this.purchases.length === 0;
      },
      responsePurchaseError => {
        this.purchases = [];
        this.errMsg = responsePurchaseError;
        console.log(this.errMsg);
      }
    );
  }

  rateAndReview(purchase: IPurchase) {
    // Implement the rate and review functionality here
  }
}
