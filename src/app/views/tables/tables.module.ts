import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesListComponent } from './tables-list/tables-list.component';
import { TablesCrudComponent } from './tables-crud/tables-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TablesListComponent,
    TablesCrudComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    SharedModule
  ]
})
export class TablesModule { }
