import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from './product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productSelectedEvent = new EventEmitter<Product>();
  productListChangedEvent = new Subject<Product[]>();
  cartProductListChangedEvent = new Subject<Product[]>();
  products: Product[]= [];
  cartProducts: Product[]= [];
  maxProductId: number;
  
  constructor(private http: HttpClient) { 
    this.maxProductId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
      for (let i=0; i < this.products.length; i++ ){
        const currentId = parseInt(this.products[i].id);
        if(currentId > maxId){
          maxId = currentId
        }
      }
      return maxId
  }

  sortAndSend() {
    this.products.sort((a,b)=> a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.productListChangedEvent.next(this.products.slice());
  }
  
  getProducts(){
    this.http.get<Product[]>('http://localhost:3000/products')
    .subscribe(
      // success method
      (products: Product[])  => {
         this.products = products
         this.maxProductId = this.getMaxId()
         this.products.sort((a,b)=>{
          if (a.name > b.name){
            return 1;
          }else{
            return -1;
          }
         });
         this.sortAndSend();
      },
      // error method
      ((error: any) => {
         console.log(error);
      }));
  
      return this.products.slice()
  }

  getCartProducts(){
    this.http.get<Product[]>('http://localhost:3000/cart')
    .subscribe(
      // success method
      (cartProducts: Product[])  => {
         this.cartProducts = cartProducts
        //  this.maxProductId = this.getMaxId()
         this.cartProducts.sort((a,b)=>{
          if (a.name > b.name){
            return 1;
          }else{
            return -1;
          }
         });
        //  this.sortAndSend();
        this.cartProductListChangedEvent.next(this.cartProducts.slice());
      },
      // error method
      ((error: any) => {
         console.log(error);
      }));
  
      return this.cartProducts.slice()
  }

  getProduct(id: string): Product{
    const contact = this.products.find(element => element.id === id);
    return contact || null;
  }
  
  deleteProduct(product: Product) {
    if (!product) {
      return;
    }
  
    const pos = this.cartProducts.findIndex(d => d.id === product.id);
  
    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.http.delete('http://localhost:3000/cart/' + product.id)
      .subscribe(
        (response: Response) => {
          this.cartProducts.splice(pos, 1);
          // this.sortAndSend();
          this.cartProductListChangedEvent.next(this.cartProducts.slice());
        }
      );
  }

  addProduct(product: Product) {
    if (!product) {
      return;
    }
  
    // make sure id of the new Product is empty
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // add to database
    this.http.post<{ message: string, product: Product }>('http://localhost:3000/cart',
      product,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new product to documents
          // this.documents.push(responseData.product);
          // this.sortAndSend();
        }
      );
  }
}


