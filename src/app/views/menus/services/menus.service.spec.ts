/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenusService } from './menus.service';

describe('Service: Menus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenusService]
    });
  });

  it('should ...', inject([MenusService], (service: MenusService) => {
    expect(service).toBeTruthy();
  }));
});
