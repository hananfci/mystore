import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { SuccessorderComponent } from './successorder/successorder.component';


const routes: Routes =[ 
  {
    path: 'product',
    loadChildren: () => import('./product/product.module')
      .then(m => m.ProductModule)
  },
  {
    path: 'cart',
    component:CartComponent
  },
  {
    path: 'success',
    component:SuccessorderComponent
  },
  { path: '',redirectTo: 'product', pathMatch: 'full'},   
  { path: '**', redirectTo: 'products' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
