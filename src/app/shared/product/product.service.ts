import { Product } from './product.model';

export class ProductService {
    private products: Product[] = [
        new Product('gpu', 'grafische kaart', 'https://d2skuhm0vrry40.cloudfront.net/2019/articles/2019-09-28-10-35/gpu-power-ladder-all-graphics-cards-tested-1569663337391.jpg/EG11/resize/1200x-1/gpu-power-ladder-all-graphics-cards-tested-1569663337391.jpg', 19.99),
        new Product('cpu', 'grafische kaart', 'https://d2skuhm0vrry40.cloudfront.net/2019/articles/2019-09-28-10-35/gpu-power-ladder-all-graphics-cards-tested-1569663337391.jpg/EG11/resize/1200x-1/gpu-power-ladder-all-graphics-cards-tested-1569663337391.jpg', 19.99),
        new Product('hardeschijf', 'grafische kaart', 'https://d2skuhm0vrry40.cloudfront.net/2019/articles/2019-09-28-10-35/gpu-power-ladder-all-graphics-cards-tested-1569663337391.jpg/EG11/resize/1200x-1/gpu-power-ladder-all-graphics-cards-tested-1569663337391.jpg', 19.99),
        new Product('monitor', 'grafische kaart', 'https://d2skuhm0vrry40.cloudfront.net/2019/articles/2019-09-28-10-35/gpu-power-ladder-all-graphics-cards-tested-1569663337391.jpg/EG11/resize/1200x-1/gpu-power-ladder-all-graphics-cards-tested-1569663337391.jpg', 19.99)
    ];

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
