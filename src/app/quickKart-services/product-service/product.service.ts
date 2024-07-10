import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/quickKart-interfaces/product';
import { ICategory } from 'src/app/quickKart-interfaces/category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  products!: IProduct[];
  categories!: ICategory[];
  constructor(private http: HttpClient) { }


  getProducts(): Observable<IProduct[]> {

    let tempVar = this.http.get<IProduct[]>('http://localhost:11990/api/Product/GetProducts').pipe(catchError(this.errorHandler));
    return tempVar;

  }


  getProductCategories(): Observable<ICategory[]> {
    let tempVar = this.http.get<ICategory[]>('http://localhost:11990/api/Category/GetCategories').pipe(catchError(this.errorHandler));;
    return tempVar;
  }


  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  } 


}
