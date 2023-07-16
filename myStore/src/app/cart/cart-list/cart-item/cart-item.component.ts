import { Component, Input } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'store-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() cartProduct: Product;

  constructor( private productService: ProductService){}

  onDelete(cartProduct: Product){
    this.productService.deleteProduct(cartProduct);
  }
}
