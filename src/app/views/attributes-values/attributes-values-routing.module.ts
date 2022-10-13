import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { AttributesValuesCrudComponent } from './attributes-values-crud/attributes-values-crud.component';
import { AttributesValuesListComponent } from './attributes-values-list/attributes-values-list.component';

const routes: Routes = [
  {
    path: "",
    component: AttributesValuesListComponent,
  },
  {
    path: "create",
    component: AttributesValuesCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:id",
    component: AttributesValuesCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:id",
    component: AttributesValuesCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesValuesRoutingModule { }
