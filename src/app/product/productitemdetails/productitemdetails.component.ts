import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../share/product.service';
import { IcartProduct } from '../share/product.model';
@Component({
  selector: 'app-productitemdetails',
  templateUrl: './productitemdetails.component.html',
  styleUrls: ['./productitemdetails.component.scss']
})
export class ProductitemdetailsComponent implements OnInit {

  productdetails: any;
  loadingdata :boolean= false;
  amountCount:number = 1; 
  exist:boolean = false;
  amounts:Array<Object> = [
      {value: 1, name: "1"},
      {value: 2, name: "2"},
      {value: 3, name: "3"},
      {value: 4, name: "4"}
  ];
  cartProducts:IcartProduct[] = [];
  constructor(private productservics:ProductService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.cartProducts = this.productservics.getCartProduct();
    this.OnGeProductdetails();
  }
  OnGeProductdetails() {
    this.productservics.onGetProduct((this.route.snapshot.paramMap.get('id'))).subscribe((res) => {
    this.loadingdata = true;
      const jsonValue = JSON.stringify(res);
      const valueFromJson = JSON.parse(jsonValue);
      this.productdetails = (valueFromJson || {})
    });
  }
  amoutcount(e){
    this.amountCount = e
   }
   addtocart(){ 
    let cartitem:IcartProduct = {
    "id":this.productdetails.id,
    "product":this.productdetails,
    "amount":this.amountCount
    }
   let itemId = this.productdetails.id
    this.exist = this.cartProducts.some(function(el){ return el.id == itemId});
    if(!this.exist){
      this.cartProducts.push(cartitem)
    }
    else{
      this.cartProducts.map(item => {
        let oldeamount = 0;
        if(item.id == itemId){
          oldeamount = Number(item.amount)
          item.amount = oldeamount + Number(this.amountCount);
          return item.amount;
        }
      });
    }
    this.productservics.getCardCount({amount:this.amountCount, cartsubmit: false },this.cartProducts)
    alert("Add to cart")
    }
   goBack(){
      this.router.navigate([`product`]);
    }
}
