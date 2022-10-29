import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { VariationCrudComponent } from './variation-crud/variation-crud.component';
import { VariationListComponent } from './variation-list/variation-list.component';

const routes: Routes = [
  {
    path: "list/:menuItemId",
    component: VariationListComponent,
  },
  {
    path: "create/:menuItemId",
    component: VariationCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:menuItemId/:id",
    component: VariationCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:menuItemId/:id",
    component: VariationCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariationRoutingModule { }
