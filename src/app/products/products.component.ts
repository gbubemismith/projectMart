import { ShoppingCart } from './../models/shopping-cart';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { CategoryService } from './../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Products[] = [];
  filteredProducts: Products[] = [];
  category: string;
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    private producService: ProductService, private cartService: ShoppingCartService) { 
      

    producService.getAll().subscribe(products => {
      this.products = products;

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category)
                                  : this.products;
      });
    });

    

    
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
