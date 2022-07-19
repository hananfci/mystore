import { Component, OnInit } from '@angular/core';
import { ProductService } from './product/share/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mystore';
  cardCount:number = 0;
  constructor(private productservics:ProductService){}
  ngOnInit() {
      this.productservics.countCard.subscribe(res =>{
        this.cardCount = this.cardCount + Number(res)
      })
  }
}
