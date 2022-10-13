import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusItemsRoutingModule } from './menus-items-routing.module';
import { MenusItemsListComponent } from './menus-items-list/menus-items-list.component';
import { MenusItemsCrudComponent } from './menus-items-crud/menus-items-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MenusItemsListComponent,
    MenusItemsCrudComponent
  ],
  imports: [
    CommonModule,
    MenusItemsRoutingModule,
    SharedModule
  ]
})
export class MenusItemsModule { }
