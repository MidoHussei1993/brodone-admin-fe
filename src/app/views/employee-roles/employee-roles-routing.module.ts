import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormMode } from "src/app/shared/models";
import { EmployeeRolesCrudComponent } from "./employee-roles-crud/employee-roles-crud.component";
import { EmployeeRolesListComponent } from "./employee-roles-list/employee-roles-list.component";

const routes: Routes = [
  { path: "", component: EmployeeRolesListComponent },
  {
    path: "create",
    component: EmployeeRolesCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:roleId",
    component: EmployeeRolesCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:roleId",
    component: EmployeeRolesCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRolesRoutingModule {}
