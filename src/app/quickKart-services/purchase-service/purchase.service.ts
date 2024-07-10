import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPurchase } from 'src/app/quickKart-interfaces/purchase'
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {


  private purchaseUrl = 'http://localhost:11990/api/purchase/GetPurchaseDetailsByEmailId'
  constructor(private http: HttpClient) { }

  getPurchasesByEmail(email: string): Observable<IPurchase[]> {
    return this.http.get<IPurchase[]>(`${this.purchaseUrl}?emailId=${email}`);
  }
}


