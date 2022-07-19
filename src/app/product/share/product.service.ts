import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  @Output() countCard = new EventEmitter();
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
  onPost(product: object){
    return this.http.post<IProduct>(`${this.apiRoot}/products`, product);
  }
  getCardCount(num:number){
    this.countCard.emit(num)
    }
 
}