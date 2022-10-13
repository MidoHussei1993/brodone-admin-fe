import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { AttributesCrudComponent } from './attributes-crud/attributes-crud.component';
import { AttributesListComponent } from './attributes-list/attributes-list.component';

const routes: Routes = [
  {
    path: "",
    component: AttributesListComponent,
  },
  // { path: 'list/id', component: AttributesListComponent },
  {
    path: "create",
    component: AttributesCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:id",
    component: AttributesCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:id",
    component: AttributesCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesRoutingModule { }
