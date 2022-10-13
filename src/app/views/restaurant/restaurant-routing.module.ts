import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { RestaurantCrudComponent } from './restaurant-crud/restaurant-crud.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: RestaurantListComponent },
      { 
        path: 'create',
       component: RestaurantCrudComponent, 
       data: {mode: FormMode.Create}
       },
      { path: 'edit/:id',
       component: RestaurantCrudComponent , 
       data: {mode: FormMode.Edit}
      },
      { path: 'view/:id',
       component: RestaurantCrudComponent , 
       data: {mode: FormMode.View}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
