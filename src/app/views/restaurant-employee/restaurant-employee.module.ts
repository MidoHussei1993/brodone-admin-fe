import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantEmployeeRoutingModule } from './restaurant-employee-routing.module';
import { RestaurantEmployeeListComponent } from './restaurant-employee-list/restaurant-employee-list.component';
import { RestaurantEmployeeCrudComponent } from './restaurant-employee-crud/restaurant-employee-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RestaurantEmployeeListComponent,
    RestaurantEmployeeCrudComponent
  ],
  imports: [
    CommonModule,
    RestaurantEmployeeRoutingModule,
    SharedModule
  ]
})
export class RestaurantEmployeeModule { }
