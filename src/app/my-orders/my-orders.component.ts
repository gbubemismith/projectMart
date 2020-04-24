import { switchMap } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<any[]>;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid).valueChanges()));
    
  }

  ngOnInit() {
    
  }

}
