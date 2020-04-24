import { Observable } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  
  cart$: Observable<ShoppingCart>;

  

  constructor(private shoppingCartService: ShoppingCartService ) { }

  async ngOnInit() {
     this.cart$ = await this.shoppingCartService.getCart();
    
    
  }





}
