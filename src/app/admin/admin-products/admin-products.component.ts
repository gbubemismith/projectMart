import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Products[];
  filteredProducts: any[];
  subscription: Subscription;
  rowsOnpage = 2;


  constructor(private productService: ProductService) { 

    // this.subscription = this.productService.getAll()
    //                     .subscribe(products => {
    //                       products.forEach(product => {

    //                         this.products.push({ key: product.key, ...product.payload.val() as Products});
                            
    //                       })

    //                       this.filteredProducts = this.products;
    //                       console.log(this.filteredProducts);
    //                     });

    this.subscription = this.productService.getAll()
                            .subscribe(products => this.filteredProducts = this.products = products );
    
  }
 
  ngOnInit() { 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

}
