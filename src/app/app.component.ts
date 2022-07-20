import { Component, OnInit } from '@angular/core';
import { IcartProduct } from './product/share/product.model';
import { ProductService } from './product/share/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mystore';
  cardCount:number = 0;
  cartProducts:IcartProduct[] = [];
  constructor(private productservics:ProductService){}
  ngOnInit() {
    this.cartProducts = this.productservics.getCartProduct();
 
    this.cartProducts.forEach(el =>{
          this.cardCount += Number(el.amount)
          }) 
      this.productservics.countCard.subscribe(res =>{
        if(!res.cartsubmit){
          if(res.decreas){
            this.cardCount = Number(res.amount)
          }
          else{
            this.cardCount = this.cardCount + Number(res.amount)
          }
          
          }

          else{
            this.cardCount = 0
          }
       }
     )
  }

}
