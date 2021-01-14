import { Product } from './product.model';

export class ProductService {
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

    setProducts(products: Product[]){
        this.products = products;
    }
}
