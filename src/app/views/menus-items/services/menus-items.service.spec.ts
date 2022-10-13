/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenusItemsService } from './menus-items.service';

describe('Service: MenusItems', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenusItemsService]
    });
  });

  it('should ...', inject([MenusItemsService], (service: MenusItemsService) => {
    expect(service).toBeTruthy();
  }));
});
