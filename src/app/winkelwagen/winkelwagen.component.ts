import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { WinkelwagenService } from '../shared/winkelwagen.service';

@Component({
  selector: 'app-winkelwagen',
  templateUrl: './winkelwagen.component.html',
  styleUrls: ['./winkelwagen.component.css']
})
export class WinkelwagenComponent implements OnInit {
  public products: Product[];
  constructor(private winkelService: WinkelwagenService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  removeProduct(index: number){
    this.winkelService.removeProduct(index);
    this.loadProduct();
  }

  loadProduct(){
    this.products = this.winkelService.getProducts();
  }
  editAmount(index: number, amount: number){
    this.winkelService.editProduct(index, amount)
  }
}
