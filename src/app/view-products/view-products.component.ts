import { Component, OnInit } from '@angular/core';
import { IProduct } from '../quickKart-interfaces/product';
import { ICategory } from '../quickKart-interfaces/category';
import { ProductService } from '../quickKart-services/product-service/product.service';
import { Router } from '@angular/router';
import { UserService } from '../quickKart-services/user-service/user.service';


@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  filteredProducts: IProduct[] = [];
  searchByProductName: string = '';
  searchByCategoryId: string = "0";
  imageSrc: string = '';
  showMsgDiv: boolean = false;
  message: string = '';
  errMsg: string = '';
  userRole: string | null = sessionStorage.getItem('userRole');
  userName: string = sessionStorage.getItem('userName')!; // Non-null assertion


  customerLayout: boolean = false;
  commonLayout: boolean = false;


  constructor(private _productService: ProductService, private _userService: UserService, private router: Router) {
    if (this.userRole === "Customer") {
      this.customerLayout = true;
    } else {
      this.commonLayout = true;
    }
  }

  ngOnInit() {
    this.getProducts();
    this.getProductCategories();
    if (this.products.length === 0) {
      this.showMsgDiv = true;
      this.message = "No products available";
    }
    this.filteredProducts = this.products;
    this.imageSrc = "assets/shopping-cart.png";
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      responseProductData => {
        this.products = responseProductData;
        this.filteredProducts = responseProductData;
        this.showMsgDiv = false;
      },
      responseProductError => {
        this.products = [];
        this.errMsg = responseProductError;
        console.log(this.errMsg);
      }
    );
  }

  getProductCategories() {
    this._productService.getProductCategories().subscribe(
      responseCategoryData => this.categories = responseCategoryData,
      responseCategoryError => {
        this.categories = [];
        this.errMsg = responseCategoryError;
        console.log(this.errMsg);
      }
    );
  }

  searchProduct(productName: string) {
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(prod => prod.categoryId.toString() == this.searchByCategoryId);
    }
    if (productName != null || productName == "") {
      this.searchByProductName = productName;
      this.filteredProducts = this.filteredProducts.filter(prod => prod.productName.toLowerCase().indexOf(productName.toLowerCase()) >= 0);
    }
    this.showMsgDiv = this.filteredProducts.length == 0;
  }

  searchProductByCategory(categoryId: string) {
    if (this.searchByProductName != null || this.searchByProductName == "") {
      this.filteredProducts = this.products.filter(prod => prod.productName.toLowerCase().indexOf(this.searchByProductName.toLowerCase()) >= 0);
    } else {
      this.filteredProducts = this.products;
    }
    this.searchByCategoryId = categoryId;
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.filteredProducts.filter(prod => prod.categoryId.toString() == this.searchByCategoryId);
    }
  }


  addToCart(prod: IProduct) {
    if (this.userRole == null) {
      this.router.navigate(['/login']);
    }
    else {
      this._userService.addProductToCart(prod.productId, this.userName)
        .subscribe(
          responseProductData => {
            //this.message = responseProductData;
            if (responseProductData) {
              alert("Product added sucessfully.")
            }
          },
          responseProductError => {
            this.errMsg = responseProductError,
              console.log(this.errMsg),
              alert("Sorry, something went wrong. Please try again after sometime.")
          },
          () => console.log("AddToCart method executed successfully")
        );
    }
  }






}
