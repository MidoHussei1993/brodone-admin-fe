import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsCrudComponent } from './permissions-crud/permissions-crud.component';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PermissionsCrudComponent,
    PermissionsListComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    SharedModule
  ]
})
export class PermissionsModule { }
