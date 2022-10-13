/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeBranchesService } from './employee-branches.service';

describe('Service: EmployeeBranches', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeBranchesService]
    });
  });

  it('should ...', inject([EmployeeBranchesService], (service: EmployeeBranchesService) => {
    expect(service).toBeTruthy();
  }));
});
