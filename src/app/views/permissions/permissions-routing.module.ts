import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { PermissionsCrudComponent } from './permissions-crud/permissions-crud.component';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';

const routes: Routes = [
  {
    path: "",
    component: PermissionsListComponent,
  },
  // { path: 'list/id', component: PermissionsListComponent },
  {
    path: "create",
    component: PermissionsCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:id",
    component: PermissionsCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:id",
    component: PermissionsCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
