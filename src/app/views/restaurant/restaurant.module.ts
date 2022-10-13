import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantCrudComponent } from './restaurant-crud/restaurant-crud.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RestaurantListComponent,
    RestaurantCrudComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    SharedModule
  ]
})
export class RestaurantModule { }
