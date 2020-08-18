import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'new', component: CreateComponent },
  { path: ':id', component: ProductComponent },
  { path: '', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class ProductRoutingModule {}
