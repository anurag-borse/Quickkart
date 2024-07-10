import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IUser } from 'src/app/quickKart-interfaces/user';
import { ICart } from 'src/app/quickKart-interfaces/cart';
import { ICartProduct } from '../../quickKart-interfaces/cartproduct';
import { IRating } from '../../quickKart-interfaces/rating';
import { IReview } from '../../quickKart-interfaces/review';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private baseUrl = 'http://localhost:11990/api/user';

  constructor(private http: HttpClient) { }

  validateCredentials(id: string, password: string): Observable<string> {
    var userObj: IUser;
    userObj = {
      emailId: id,
      userPassword: password,
      gender: null,
      roleId: null,
      dateOfBirth: null,
      address: null
    };
    return this.http.post<string>('http://localhost:11990/api/user/ValidateUserCredentials', userObj)
      .pipe(catchError(this.errorHandler));
  }



  addProductToCart(productId: string, emailId: string): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: productId, emailId: emailId, quantity: 1 };
    return this.http.post<boolean>('http://localhost:11990/api/user/AddProductToCart', cartObj).pipe(catchError(this.errorHandler));
  }


  getCartProducts(emailId: string): Observable<ICartProduct[]> {
    let param = "?emailId=" + emailId;
    return this.http.get<ICartProduct[]>('http://localhost:11990/api/user/GetCartProducts' + param).pipe(catchError(this.errorHandler));

  }



  updateCartProduct(emailId: string, productId: string, qty: number): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: productId, emailId: emailId, quantity: qty };
    return this.http.put<boolean>('http://localhost:11990/api/user/UpdateCartProducts', cartObj).pipe(catchError(this.errorHandler));


  }

  deleteCartProduct(prodId: string, emailId: string): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: prodId, emailId: emailId, quantity: 0 };
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: cartObj };
    return this.http.delete<boolean>('http://localhost:11990/api/user/DeleteCartProduct', httpOptions).pipe(catchError(this.errorHandler));

  }



  updateReview(review: IReview): Observable<boolean> {
    
    
    return this.http.put<boolean>('http://localhost:11990/api/rating/UpdateReviewComments', review).pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
