import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { ResourcesCrudComponent } from './resources-crud/resources-crud.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ResourcesListComponent },
      { 
        path: 'create',
       component: ResourcesCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: ResourcesCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: ResourcesCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
