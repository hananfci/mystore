import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcartProduct, IProduct } from '../share/product.model';
import { ProductService } from '../share/product.service';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  Products :IProduct[];
  cartProducts:IcartProduct[] = [];
  loadingdata :boolean= false;
  amountCount:number = 1;
  amountChange:boolean = false;
 exist:boolean = false;
 @Input() amounts:Array<any>;
  
  constructor(private productservics:ProductService,
               private router: Router,private route:ActivatedRoute)  { }
 
 
  ngOnInit() {
  this.cartProducts = this.productservics.getCartProduct();
   this.productsList()  
 }
 productsList() {
   
   this.productservics.getProductssList().subscribe(    
       response => {
        this.loadingdata= true;
         const jsonValue = JSON.stringify(response);
         const valueFromJson = JSON.parse(jsonValue);
         this.productsList = ((valueFromJson || {}));
       },
       error => {
         
       });
 }
 amoutcount(e){
  this.amountChange = true
  this.amountCount = e
  console.log("recent amount",this.amountCount)
 }
 addtocart(productitem:IProduct){  
  let cartitem:IcartProduct = {
    "id":productitem.id,
    "product":productitem,
    "amount":this.amountCount,    
    }
    if(!this.amountChange){
      this.amountCount = 1;
    }
    this.exist =this.cartProducts.some(function(el){ return el.id == productitem.id});
    if(!this.exist){
      this.cartProducts.push(cartitem)
    }
    else {
      this.cartProducts.map(item => {
        let oldeamount = 0;
        if(item.id == productitem.id){
          oldeamount = Number(item.amount)
          item.amount = oldeamount + Number(this.amountCount);
          console.log("old amount",oldeamount, "amount",item.amount)
          return item.amount;
        }
      });
    }
    this.amountChange  = false;
  this.productservics.getCardCount({amount:this.amountCount, cartsubmit: false },this.cartProducts)
  alert("Add to cart")
  }
 productDetails(id: number) {
    this.router.navigate([`product/${id}`]);
  } 

}
