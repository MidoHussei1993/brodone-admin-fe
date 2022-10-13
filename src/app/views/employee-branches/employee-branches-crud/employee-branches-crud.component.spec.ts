import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBranchesCrudComponent } from './employee-branches-crud.component';

describe('EmployeeBranchesCrudComponent', () => {
  let component: EmployeeBranchesCrudComponent;
  let fixture: ComponentFixture<EmployeeBranchesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBranchesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBranchesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
