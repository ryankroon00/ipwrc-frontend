import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { WinkelwagenService } from '../shared/winkelwagen.service';

@Component({
  selector: 'app-producten',
  templateUrl: './producten.component.html',
  styleUrls: ['./producten.component.css']
})
export class ProductenComponent implements OnInit {
  products: Product[];
  public showDetail = false;
  public selectedProduct: Product;

  constructor(private route: ActivatedRoute,
    private router: Router,  
    private productService: ProductService, 
    private winkelwageService: WinkelwagenService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
  
  addToCart(amount: number){
    this.showDetail = false;
    this.selectedProduct.amount = amount;
    this.winkelwageService.addProduct(this.selectedProduct)
  }

  showDetailProduct(index: number){
    this.showDetail = true;
    this.selectedProduct = this.productService.getProduct(index);
  }
}
