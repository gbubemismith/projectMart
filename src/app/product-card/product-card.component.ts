import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Products } from 'src/app/models/products';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Products;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { 

    

  }

  ngOnInit() {
  }


  addToCart() {
    this.cartService.addToCart(this.product);
  }



}
