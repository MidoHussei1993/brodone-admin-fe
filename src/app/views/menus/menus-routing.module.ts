import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { MenusCrudComponent } from './menus-crud/menus-crud.component';
import { MenusListComponent } from './menus-list/menus-list.component';

const routes: Routes = [
  {
    path: "",
    component: MenusListComponent,
  },
  // { path: 'list/id', component: MenusListComponent },
  {
    path: "create",
    component: MenusCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit",
    component: MenusCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view",
    component: MenusCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
