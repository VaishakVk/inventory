import { NgModule } from '@angular/core';

import { CreateComponent } from '../products/create/create.component';
import { ProductComponent } from '../products/product/product.component';
import { ListComponent } from '../products/list/list.component';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductRoutingModule } from './product.routing.module';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ProductComponent,
    ProductsComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, FormsModule],
  providers: [],
  bootstrap: [],
})
export class ProductsModule {}
