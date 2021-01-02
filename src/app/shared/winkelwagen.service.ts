import { Product } from './product/product.model';

export class WinkelwagenService {
    private totalPrice = 0;
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    getProducts(): any {
        return this.products.slice();
    }

    getProduct(id: number): any {
        return this.products[id];
    }

    removeProduct(index: number): any {
        this.products.splice(index, 1);
    }

    removeProducts(): void{
        this.products = [];
    }

    editProduct(index: number, amount: number): void {
        this.products[index].amount = amount;
    }

    getTotalPrice(): any{
        this.totalPrice = 0;
        if (this.products.length === 0){
            this.totalPrice = 0;
        } else {
            this.products.forEach(element => {
                this.totalPrice = this.totalPrice + element.prijs;
            });
        }
        return this.totalPrice;
    }
}
