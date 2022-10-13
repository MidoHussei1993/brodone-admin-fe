import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBranchesListComponent } from './employee-branches-list.component';

describe('EmployeeBranchesListComponent', () => {
  let component: EmployeeBranchesListComponent;
  let fixture: ComponentFixture<EmployeeBranchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBranchesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBranchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
