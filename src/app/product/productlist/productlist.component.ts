import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../share/product.model';
import { ProductService } from '../share/product.service';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  Products :IProduct[];
  loadingdata :boolean= false;
  amountCount:number = 1;
 
  amounts:Array<Object> = [
      {value: 1, name: "1"},
      {value: 2, name: "2"},
      {value: 3, name: "3"},
      {value: 4, name: "4"}
  ];
  
  constructor(private productservics:ProductService,
               private router: Router,)  { }
 
 
  ngOnInit() {
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
  this.amountCount = e
 }
 addtocart(){
this.productservics.getCardCount({amount:this.amountCount, cartsubmit: false })
  }
 productDetails(id: number) {
    this.router.navigate([`product/${id}`]);
  } 

}
