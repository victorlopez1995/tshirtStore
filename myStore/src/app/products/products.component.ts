import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'store-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  selectedProduct: Product;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.productSelectedEvent
    .subscribe(
     (product: Product)=>{
       this.selectedProduct= product;
     }
    )
  }

  ngOnDestroy(): void {
    
  }
}
