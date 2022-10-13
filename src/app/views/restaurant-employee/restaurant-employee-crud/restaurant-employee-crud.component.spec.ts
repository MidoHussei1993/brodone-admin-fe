import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEmployeeCrudComponent } from './restaurant-employee-crud.component';

describe('RestaurantEmployeeCrudComponent', () => {
  let component: RestaurantEmployeeCrudComponent;
  let fixture: ComponentFixture<RestaurantEmployeeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantEmployeeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantEmployeeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
