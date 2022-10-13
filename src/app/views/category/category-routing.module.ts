import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormMode } from "src/app/shared/models";
import { CategoryCrudComponent } from "./category-crud/category-crud.component";
import { CategoryListComponent } from "./category-list/category-list.component";

const routes: Routes = [
  {
    path: "",
    component: CategoryListComponent,
  },
  // { path: 'list/id', component: CategoryListComponent },
  {
    path: "create",
    component: CategoryCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:id",
    component: CategoryCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:id",
    component: CategoryCrudComponent,
    data: { mode: FormMode.View },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
