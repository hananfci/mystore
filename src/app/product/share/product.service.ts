import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IcartProduct, IProduct } from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  @Output() countCard = new EventEmitter<any>();
  totalprice: BehaviorSubject<number> = new BehaviorSubject(0);
  apiRoot=environment.apiRoot;
  constructor(private http:HttpClient) { }
 
  getProductssList():Observable<any>
  {
    return this.http.get(`${this.apiRoot}/products?limit=10`);
  }
  onGetProduct(id:string){    
    return this.http.get(`${this.apiRoot}/products/${id}`);  
  } 
  getUserCart():Observable<any>{
    return this.http.get(`${this.apiRoot}/carts/6`)
  }
 
  getCartProduct(): IcartProduct[] | []{
    debugger
    const getProduct = localStorage.getItem('cart')
    return getProduct? JSON.parse(getProduct): [];
  }
  getCardCount(num:object,product:IcartProduct []){    
    localStorage.setItem('cart', JSON.stringify(product));    
    this.countCard.emit(num)
    }
 


   
}