import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesValuesCrudComponent } from './attributes-values-crud.component';

describe('AttributesValuesCrudComponent', () => {
  let component: AttributesValuesCrudComponent;
  let fixture: ComponentFixture<AttributesValuesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributesValuesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesValuesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
