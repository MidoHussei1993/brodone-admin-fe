import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRolesCrudComponent } from './employee-roles-crud.component';

describe('EmployeeRolesCrudComponent', () => {
  let component: EmployeeRolesCrudComponent;
  let fixture: ComponentFixture<EmployeeRolesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRolesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRolesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
