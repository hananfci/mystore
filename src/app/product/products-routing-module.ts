import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductitemdetailsComponent } from './productitemdetails/productitemdetails.component';
const routes: Routes = [

{path: '', component:ProductlistComponent}, 
{path:':id', component: ProductitemdetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})



  export class ProductsRoutingModule { }



