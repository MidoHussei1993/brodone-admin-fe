import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCrudComponent } from './product-crud/product-crud.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    ProductCrudComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
