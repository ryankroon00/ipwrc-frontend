import { Product } from './product/product.model';

export class Bestelling {
    public id: number
    public totalPrijs: number;
    public products: Product[] = [];
    public orderDate: string;
    public userId: number;
    public status = 'getting prepared';

    constructor(totalPrice: number, products: Product[], userId: number){
        this.products = products;
        this.totalPrijs = totalPrice;
        this.userId = userId;
    }

}
