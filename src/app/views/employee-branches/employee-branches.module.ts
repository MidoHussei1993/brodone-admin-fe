import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeBranchesRoutingModule } from './employee-branches-routing.module';
import { EmployeeBranchesListComponent } from './employee-branches-list/employee-branches-list.component';
import { EmployeeBranchesCrudComponent } from './employee-branches-crud/employee-branches-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmployeeBranchesListComponent,
    EmployeeBranchesCrudComponent
  ],
  imports: [
    CommonModule,
    EmployeeBranchesRoutingModule,
    SharedModule
  ]
})
export class EmployeeBranchesModule { }
