import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'store-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products= [];
  subscription: Subscription;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.subscription = this.productService.productListChangedEvent
    .subscribe(
      (productList: Product[])=>{
        this.products= productList;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
