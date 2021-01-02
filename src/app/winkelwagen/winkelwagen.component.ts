import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bestelling } from '../shared/bestelling.model';
import { Product } from '../shared/product/product.model';
import { UserService } from '../shared/user/user.service';
import { WinkelwagenService } from '../shared/winkelwagen.service';
import { ApiManager } from '../utils/api-manager.service';

@Component({
  selector: 'app-winkelwagen',
  templateUrl: './winkelwagen.component.html',
  styleUrls: ['./winkelwagen.component.css']
})
export class WinkelwagenComponent implements OnInit {
  public products: Product[];
  public totalPrice: number;
  constructor(
    private winkelService: WinkelwagenService, 
    private route: Router,
    private userService: UserService,
    private api: ApiManager) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  removeProduct(index: number): void {
    this.winkelService.removeProduct(index);
    this.loadProducts();
  }

  loadProducts(): void{
    this.totalPrice = this.winkelService.getTotalPrice();
    this.products = this.winkelService.getProducts();
  }

  editAmount(index: number, amount: number): void {
    this.winkelService.editProduct(index, amount);
  }

  createOrder(): void{
    if (this.userService.user != null){

      const bestelling = new Bestelling(this.totalPrice, this.products,this.userService.user.id);
      this.winkelService.removeProducts();
      
      this.api.createPostRequest('/order', JSON.stringify(bestelling));
      this.route.navigate(['/bestelling']);
    } else {
      alert("you have to login before you can order something");
      this.route.navigate(['login']);
    }
  }
}
