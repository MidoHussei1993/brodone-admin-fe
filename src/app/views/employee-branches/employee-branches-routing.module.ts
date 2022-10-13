import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormMode } from "src/app/shared/models";
import { EmployeeBranchesCrudComponent } from "./employee-branches-crud/employee-branches-crud.component";
import { EmployeeBranchesListComponent } from "./employee-branches-list/employee-branches-list.component";

const routes: Routes = [
  { path: "", component: EmployeeBranchesListComponent },
  {
    path: "create",
    component: EmployeeBranchesCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:id",
    component: EmployeeBranchesCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:id",
    component: EmployeeBranchesCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeBranchesRoutingModule {}
