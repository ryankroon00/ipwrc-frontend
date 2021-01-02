import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../shared/product/product.model';
import { ProductService } from '../shared/product/product.service';
import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';
import { WinkelwagenService } from '../shared/winkelwagen.service';
import { ApiManager } from '../utils/api-manager.service';

@Component({
  selector: 'app-producten',
  templateUrl: './producten.component.html',
  styleUrls: ['./producten.component.css']
})
export class ProductenComponent implements OnInit {
  products: Product[];
  public showDetail = false;
  public addProductPopup = false;
  public selectedProduct: Product;
  public user: User;

  constructor(private api: ApiManager,
              private productService: ProductService, 
              private winkelwageService: WinkelwagenService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loadProducts();
    if(this.userService.user != null){
      this.user = this.userService.user
    }
    this.products = this.productService.getProducts();
  }

  addToCart(amount: number): void{
    this.showDetail = false;
    this.selectedProduct.amount = amount;
    this.winkelwageService.addProduct(this.selectedProduct);
  }

  showDetailProduct(index: number): void{
    this.showDetail = true;
    this.selectedProduct = this.productService.getProduct(index);
  }

  removeProduct(index:number){
    this.api.createDeleteRequest('/product',index.toString()).then(
      result => {
        this.showDetail = false;
        this.loadProducts();
      }
    );    
  }

  loadProducts(){
    this.api.createGetRequest('/products').then(
      products => {
        this.products = [...products];
        this.productService.setProducts(this.products)
      }
    )
  }

  addProduct(form: NgForm){
    const product = new Product(form.value.name, form.value.beschrijving, form.value.imagePath, form.value.prijs);
    this.api.createPostRequest('/product',JSON.stringify(product)).then(
      restult => {
        this.loadProducts();
      }
    );
  
  }
}
