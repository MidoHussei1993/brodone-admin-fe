import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEmployeeListComponent } from './restaurant-employee-list.component';

describe('RestaurantEmployeeListComponent', () => {
  let component: RestaurantEmployeeListComponent;
  let fixture: ComponentFixture<RestaurantEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantEmployeeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
