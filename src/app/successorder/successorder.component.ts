import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../product/share/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-successorder',
  templateUrl: './successorder.component.html',
  styleUrls: ['./successorder.component.scss']
})
export class SuccessorderComponent implements OnInit {
  orderprice: number = 0;
  constructor(private ref: ChangeDetectorRef, private productservice: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productservice.totalprice.subscribe((total) => {
      this.orderprice = total;
  });
  }
  goBack() {
    this.router.navigate([`product`]);
  }
 
}
