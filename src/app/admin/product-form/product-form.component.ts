import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {

    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      this.productService.getProductById(this.id).pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  } 

  save(product) {

    if (this.id) {
      this.productService.updateProduct(this.id, product);
    }
    else{
      this.productService.create(product);
       
    }

    //redirect
    this.router.navigate(['/admin/products']);

  }

  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.id);
      
      //redirect
      this.router.navigate(['/admin/products']);
    }
  }

}
