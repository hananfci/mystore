import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/share/product.service';
import {Location} from '@angular/common';
import { IcartProduct, IProduct, IUserInfo } from '../product/share/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProduct:IcartProduct[] = [];
  loadingdata :boolean= false;
  totalPrice:number = 0;
  productForm:FormGroup;  
  postdata :boolean= false;
  userInfoObj:IUserInfo;
  amounts:Array<Object> = [
    {value: 1, name: "1"},
    {value: 2, name: "2"},
    {value: 3, name: "3"},
    {value: 4, name: "4"}
];
  
  constructor(private productservics:ProductService,private router: Router) { }

  ngOnInit(): void {
    this.productForm=new FormGroup({
      fullName: new FormControl(null,[Validators.required]),
      address: new FormControl(null,[Validators.required]),
      creditNumber: new FormControl(null,[Validators.required]),  
    })
    this.getuserCart();
  }
 getuserCart(){
  this.productservics.getUserCart().subscribe(res =>{
    for (let i=0;i <res.products.length;i++){
      this.OnGeProductdetails(res.products[i].productId,res.products[i].quantity);
    }    
   })
   
   this.loadingdata = true
 }
 OnGeProductdetails(id:string,quantity:number) {
  this.productservics.onGetProduct(id).subscribe((res) => {
    const jsonValue = JSON.stringify(res);
    const valueFromJson = JSON.parse(jsonValue);
    this.cartProduct.push({
      "products":valueFromJson,
      "amount":quantity
    });
     this.totalPrice += Number(valueFromJson.price)
  }); 
} 

onSubmit(){
  debugger;
  this.postdata=true;
  this.userInfoObj={
    fullName:this.productForm.value.fullName,
    address:this.productForm.value.address,
    creditCardNumber:this.productForm.value.creditNumber,    
  };
  this.postdata = false;
  this.productservics.getCardCount({ amount:0, cartsubmit: true });
  this.productservics.totalprice.next(this.totalPrice);
  this.router.navigate([`success`]);
 
}
}
