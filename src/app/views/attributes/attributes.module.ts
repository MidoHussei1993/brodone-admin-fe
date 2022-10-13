import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributesRoutingModule } from './attributes-routing.module';
import { AttributesCrudComponent } from './attributes-crud/attributes-crud.component';
import { AttributesListComponent } from './attributes-list/attributes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AttributesCrudComponent,
    AttributesListComponent
  ],
  imports: [
    CommonModule,
    AttributesRoutingModule,
    SharedModule
  ]
})
export class AttributesModule { }
