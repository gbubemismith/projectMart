import { Products } from 'src/app/models/products';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
   items: ShoppingCartItem[] = [];

    /**
     *
     */
    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
           
            this.items.push(new ShoppingCartItem({ ...item, key: productId }));
        }
        
    }

    get totalPrice() {

        let sum = 0;
        for(let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }

        return sum;
    }

    get productIds() {

        return Object.keys(this.items);
    }

    get totalItemsCount() {

        let count = 0;

        for (let productId in this.items) {
          if (this.items.hasOwnProperty(productId)) {
              count += this.items[productId].quantity;
              
          }
        }
        return count;
    }

    getQuantity(product: Products) {
    
        let item = this.itemsMap[product.key];
    
        return item ? item.quantity : 0;
    }
}