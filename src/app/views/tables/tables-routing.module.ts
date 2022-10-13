import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { TablesCrudComponent } from './tables-crud/tables-crud.component';
import { TablesListComponent } from './tables-list/tables-list.component';

const routes: Routes = [
  {
    path: "",
    component: TablesListComponent,
  },
  // { path: 'list/id', component: TablesListComponent },
  {
    path: "create",
    component: TablesCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:id",
    component: TablesCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:id",
    component: TablesCrudComponent,
    data: { mode: FormMode.View },
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
