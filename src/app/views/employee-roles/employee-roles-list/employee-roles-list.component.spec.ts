import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRolesListComponent } from './employee-roles-list.component';

describe('EmployeeRolesListComponent', () => {
  let component: EmployeeRolesListComponent;
  let fixture: ComponentFixture<EmployeeRolesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRolesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
