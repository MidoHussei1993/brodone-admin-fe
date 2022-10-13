import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesCrudComponent } from './attributes-crud.component';

describe('AttributesCrudComponent', () => {
  let component: AttributesCrudComponent;
  let fixture: ComponentFixture<AttributesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
