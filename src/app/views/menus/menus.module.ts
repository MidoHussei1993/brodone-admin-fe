import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenusListComponent } from './menus-list/menus-list.component';
import { MenusCrudComponent } from './menus-crud/menus-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MenusListComponent,
    MenusCrudComponent
  ],
  imports: [
    CommonModule,
    MenusRoutingModule,
    SharedModule
  ]
})
export class MenusModule { }
