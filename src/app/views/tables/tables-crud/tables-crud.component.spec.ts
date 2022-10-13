import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesCrudComponent } from './tables-crud.component';

describe('TablesCrudComponent', () => {
  let component: TablesCrudComponent;
  let fixture: ComponentFixture<TablesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
