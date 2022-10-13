import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesValuesListComponent } from './attributes-values-list.component';

describe('AttributesValuesListComponent', () => {
  let component: AttributesValuesListComponent;
  let fixture: ComponentFixture<AttributesValuesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributesValuesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
