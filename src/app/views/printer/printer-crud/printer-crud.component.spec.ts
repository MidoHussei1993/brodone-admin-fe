import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterCrudComponent } from './printer-crud.component';

describe('PrinterCrudComponent', () => {
  let component: PrinterCrudComponent;
  let fixture: ComponentFixture<PrinterCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrinterCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
