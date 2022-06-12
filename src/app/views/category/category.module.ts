import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { GategoryListComponent } from './gategory-list/gategory-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GategoryCrudComponent } from './gategory-crud/gategory-crud.component';


@NgModule({
  declarations: [
    GategoryListComponent,
    GategoryCrudComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
