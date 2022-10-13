import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributesValuesRoutingModule } from './attributes-values-routing.module';
import { AttributesValuesListComponent } from './attributes-values-list/attributes-values-list.component';
import { AttributesValuesCrudComponent } from './attributes-values-crud/attributes-values-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AttributesValuesListComponent,
    AttributesValuesCrudComponent
  ],
  imports: [
    CommonModule,
    AttributesValuesRoutingModule,
    SharedModule
  ]
})
export class AttributesValuesModule { }
