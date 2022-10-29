/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VariationService } from './variation.service';

describe('Service: Variation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariationService]
    });
  });

  it('should ...', inject([VariationService], (service: VariationService) => {
    expect(service).toBeTruthy();
  }));
});
