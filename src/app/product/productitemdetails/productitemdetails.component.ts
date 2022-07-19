import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../share/product.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-productitemdetails',
  templateUrl: './productitemdetails.component.html',
  styleUrls: ['./productitemdetails.component.scss']
})
export class ProductitemdetailsComponent implements OnInit {

  productdetails: any;
  loadingdata :boolean= false;
  amountCount:number = 1; 
  amounts:Array<Object> = [
      {value: 1, name: "1"},
      {value: 2, name: "2"},
      {value: 3, name: "3"},
      {value: 4, name: "4"}
  ];
  constructor(private productservics:ProductService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
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
      this.productservics.getCardCount({ amount:this.amountCount, cartsubmit: false })
       alert("Add to cart")
    }
   goBack(){
      this.router.navigate([`product`]);
    }
}
