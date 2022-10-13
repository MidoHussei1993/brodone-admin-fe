import { TestBed } from '@angular/core/testing';

import { AttributesValuesService } from './attributes-values.service';

describe('AttributesValuesService', () => {
  let service: AttributesValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributesValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
