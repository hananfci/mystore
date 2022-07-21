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
  loadingdata :boolean= false;
  totalPrice:number = 0;
  productForm:FormGroup;  
  postdata :boolean= false;
  userInfoObj:IUserInfo;
  amountCount:number = 0
  nameMinlengthValidate:boolean = false;
  addresseMinlengthValidate:boolean = false;
 creditMinlengthValidate:boolean = false;
  
  amounts:Array<Object> = [
    {value: 1, name: "1"},
    {value: 2, name: "2"},
    {value: 3, name: "3"},
    {value: 4, name: "4"}
];
cartProducts:IcartProduct[] = [];
  constructor(private productservics:ProductService,private router: Router) { }

  ngOnInit(): void {
    this.productForm=new FormGroup({
      fullName: new FormControl(null,[Validators.required,Validators.minLength(20)]),
      address: new FormControl(null,[Validators.required,Validators.minLength(10)]),
      creditNumber: new FormControl(null,[Validators.required,Validators.minLength(16)]),  
    })
   
    this.OnGeProductdetails();
  }

 OnGeProductdetails() { 
  this.cartProducts = this.productservics.getCartProduct();
  console.log(this.cartProducts)
  if(this.cartProducts.length == 0){
    alert("your cart is empty, add product to cart")
    this.router.navigate([`product`]);
  }
    this.loadingdata = true;
    this.totalPrice = 0;
    this.amountCount = 0
    this.cartProducts.forEach(el =>{
        this.totalPrice += (el.product.price * el.amount) 
        this.amountCount += Number(el.amount)
        }) 
        

} 
removeFromCart(id:number){
  this.cartProducts = this.cartProducts.filter(item => item.id !== id);
  alert("you deleted item from cart")  
  localStorage.clear();
  localStorage.setItem('cart', JSON.stringify(this.cartProducts)); 
  this.OnGeProductdetails();    
  this.productservics.getCardCount({amount:this.amountCount, cartsubmit: false,decreas:true },this.cartProducts)
}
validatename(e,formcontrolname:string){
  this.nameMinlengthValidate = (formcontrolname == 'fullName') && (e.length < 20 && e !='') ? true:false ;
}
validateAddress(e,formcontrolname:string){
  this.addresseMinlengthValidate = (formcontrolname == 'address') && (e.length < 10 && e !='') ? true:false ;
}
validateCreditCard(e,formcontrolname:string){
  this.creditMinlengthValidate = (formcontrolname == 'creditcard') && (e.length < 16 && e !='') ? true:false ;

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
  this.productservics.totalprice.next(this.totalPrice);
  this.cartProducts = [];
  localStorage.clear();
  this.productservics.getCardCount({amount:this.amountCount, cartsubmit: true},this.cartProducts)
  this.router.navigate([`success`]); 
}

}
