/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrintHouseService } from './print-house.service';

describe('Service: PrintHouse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrintHouseService]
    });
  });

  it('should ...', inject([PrintHouseService], (service: PrintHouseService) => {
    expect(service).toBeTruthy();
  }));
});
