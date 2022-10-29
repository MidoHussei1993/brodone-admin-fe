import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { AttributesValuesCrudComponent } from './attributes-values-crud/attributes-values-crud.component';
import { AttributesValuesListComponent } from './attributes-values-list/attributes-values-list.component';

const routes: Routes = [
  {
    path: "list/:attributeId",
    component: AttributesValuesListComponent,
  },
  {
    path: "create/:attributeId",
    component: AttributesValuesCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:attributeId/:id",
    component: AttributesValuesCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:attributeId/:id",
    component: AttributesValuesCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesValuesRoutingModule { }
