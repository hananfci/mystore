import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }
  amounts:Array<Object> = [
    {value: 1, name: "1"},
    {value: 2, name: "2"},
    {value: 3, name: "3"},
    {value: 4, name: "4"}
];
  ngOnInit(): void {
  }

}
