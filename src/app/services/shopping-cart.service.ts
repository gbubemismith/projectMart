import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Products } from 'src/app/models/products';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product: Products) {
   
    this.updateItem(product, 1);

  }


  async removeFromcart(product: Products) {
    this.updateItem(product, -1);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
          .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if(!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);

      return result.key;
    } 

    return cartId;
  }


  private async updateItem(product: Products, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {

    
      if (item.payload.exists()) {
        let quantity = item.payload.exportVal().quantity;

        if (quantity === 0) item$.remove();
        else 
          item$.update({quantity: quantity + change });

      } else {
        item$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        });
      }
    });
  }




  

}
