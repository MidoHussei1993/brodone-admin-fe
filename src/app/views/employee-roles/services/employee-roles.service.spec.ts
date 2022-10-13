/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeRolesService } from './employee-roles.service';

describe('Service: EmployeeRoles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeRolesService]
    });
  });

  it('should ...', inject([EmployeeRolesService], (service: EmployeeRolesService) => {
    expect(service).toBeTruthy();
  }));
});
