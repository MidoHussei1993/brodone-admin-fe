import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { TagsCrudComponent } from './tags-crud/tags-crud.component';
import { TagsListComponent } from './tags-list/tags-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TagsListComponent },
      { 
        path: 'create',
       component: TagsCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: TagsCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: TagsCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
