import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiManager } from '../shared/api-manager.service';
import { Product } from '../shared/product/product.model';
import { ProductService } from '../shared/product/product.service';
import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';
import { WinkelwagenService } from '../shared/winkelwagen.service';

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
  public productUpdate: Product;

  constructor(private route: Router,
              private api: ApiManager,
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

  addToCart(): void{
    this.showDetail = false;
    this.selectedProduct.amount = 1;
    this.winkelwageService.addProduct(this.selectedProduct);
    this.route.navigate(['../winkelwagen']);
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

  OpenUpdateProduct(id: number){
    for(let i = 0; i < this.products.length; i++){
      if(this.products[i].id == id){
        this.productUpdate = this.products[i]
      }
    }
    this.addProductPopup = true;
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
    if(this.productUpdate == null){
        const product = new Product(form.value.name, form.value.beschrijving, form.value.imagePath, form.value.prijs);
        this.api.createPostRequest('/product',JSON.stringify(product)).then(
          restult => {
            this.loadProducts();
          }
        );
    } else {
      this.api.createPutRequest('/product/'+ this.productUpdate.id, JSON.stringify(this.productUpdate)).then(
        result => {
          this.productUpdate = null;
          this.loadProducts()
        }
      )
    }
    this.addProductPopup = false;
    this.showDetail = false;
  }
  
  ngAfterViewInit(){
    let elmnt = document.getElementsByClassName("center");
    elmnt[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
