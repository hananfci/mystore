import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductitemdetailsComponent } from './productitemdetails/productitemdetails.component';
import {ProductsRoutingModule} from './products-routing-module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';


@NgModule({
  declarations: [
    ProductlistComponent,
    ProductitemdetailsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductModule { }
