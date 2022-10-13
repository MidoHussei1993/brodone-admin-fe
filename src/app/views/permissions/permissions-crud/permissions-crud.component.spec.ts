import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsCrudComponent } from './permissions-crud.component';

describe('PermissionsCrudComponent', () => {
  let component: PermissionsCrudComponent;
  let fixture: ComponentFixture<PermissionsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
