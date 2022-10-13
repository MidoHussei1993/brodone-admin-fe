import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { MenusItemsCrudComponent } from './menus-items-crud/menus-items-crud.component';
import { MenusItemsListComponent } from './menus-items-list/menus-items-list.component';

const routes: Routes = [
  {
    path: "",
    component: MenusItemsListComponent,
  },
  // { path: 'list/id', component: MenusItemsListComponent },
  {
    path: "create",
    component: MenusItemsCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:id",
    component: MenusItemsCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:id",
    component: MenusItemsCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusItemsRoutingModule { }
