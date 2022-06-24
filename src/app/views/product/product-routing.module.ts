import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { ProductCrudComponent } from './product-crud/product-crud.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductListComponent },
      { 
        path: 'create',
       component: ProductCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: ProductCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: ProductCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
