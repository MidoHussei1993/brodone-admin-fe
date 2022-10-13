import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/models';
import { RestaurantEmployeeCrudComponent } from './restaurant-employee-crud/restaurant-employee-crud.component';
import { RestaurantEmployeeListComponent } from './restaurant-employee-list/restaurant-employee-list.component';


const routes: Routes = [
  { path: "", component: RestaurantEmployeeListComponent },
  {
    path: "create",
    component: RestaurantEmployeeCrudComponent,
    data: { mode: FormMode.Create },
  },
  {
    path: "edit/:id",
    component: RestaurantEmployeeCrudComponent,
    data: { mode: FormMode.Edit },
  },
  {
    path: "view/:id",
    component: RestaurantEmployeeCrudComponent,
    data: { mode: FormMode.View },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantEmployeeRoutingModule { }
