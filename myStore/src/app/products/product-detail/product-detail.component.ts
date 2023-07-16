import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'store-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: Product;
  id: string;
  nativeWindow: any;

  constructor( private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private windRefService: WindRefService ){}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.product = this.productService.getProduct(this.id);
      }
    );
    this.nativeWindow = this.windRefService.getNativeWindow();
  }
  
  onBuy(){
    this.productService.addProduct(this.product);
  }

  // onDelete(){
  //   this.productService.deleteProduct(this.product);
  //   this.router.navigate(['/products']);
  // }
}
