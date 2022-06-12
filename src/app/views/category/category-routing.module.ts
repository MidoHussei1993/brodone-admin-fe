import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { GategoryCrudComponent } from './gategory-crud/gategory-crud.component';
import { GategoryListComponent } from './gategory-list/gategory-list.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: GategoryListComponent },
      { 
        path: 'create',
       component: GategoryCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: GategoryCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: GategoryCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
