/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestaurantEmplooyeesService } from './restaurant-emplooyees.service';

describe('Service: RestaurantEmplooyees', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantEmplooyeesService]
    });
  });

  it('should ...', inject([RestaurantEmplooyeesService], (service: RestaurantEmplooyeesService) => {
    expect(service).toBeTruthy();
  }));
});
