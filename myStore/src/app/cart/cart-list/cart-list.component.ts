import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'store-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  cartProducts: Product[]=[];
  subscription: Subscription;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.cartProducts = this.productService.getCartProducts();
    this.subscription = this.productService.cartProductListChangedEvent
    .subscribe(
      (cartProductList: Product[])=>{
        this.cartProducts= cartProductList;
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
