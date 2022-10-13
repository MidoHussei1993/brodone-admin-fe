import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRolesRoutingModule } from './employee-roles-routing.module';
import { EmployeeRolesListComponent } from './employee-roles-list/employee-roles-list.component';
import { EmployeeRolesCrudComponent } from './employee-roles-crud/employee-roles-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmployeeRolesListComponent,
    EmployeeRolesCrudComponent
  ],
  imports: [
    CommonModule,
    EmployeeRolesRoutingModule,
    SharedModule
  ]
})
export class EmployeeRolesModule { }
