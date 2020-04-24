import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;


  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 
    

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(user => this.appUser = user);

    this.cart$ = await this.shoppingCartService.getCart();
    

  
  }


  logout() {
    this.auth.logout();
  }

}
