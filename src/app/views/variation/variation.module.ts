import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariationRoutingModule } from './variation-routing.module';
import { VariationListComponent } from './variation-list/variation-list.component';
import { VariationCrudComponent } from './variation-crud/variation-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VariationListComponent,
    VariationCrudComponent
  ],
  imports: [
    CommonModule,
    VariationRoutingModule,
    SharedModule
  ]
})
export class VariationModule { }
