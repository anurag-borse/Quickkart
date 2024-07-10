import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICartProduct } from 'src/app/quickKart-interfaces/cartproduct';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:11990/api/user/GetCartProducts'; 

  constructor(private http: HttpClient) { }

  getCartProducts(emailId: string): Observable<ICartProduct[]> {
    return this.http.get<ICartProduct[]>(`${this.apiUrl}?emailId=${emailId}`);
  }
}
