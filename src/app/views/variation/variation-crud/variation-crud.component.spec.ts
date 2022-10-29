import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationCrudComponent } from './variation-crud.component';

describe('VariationCrudComponent', () => {
  let component: VariationCrudComponent;
  let fixture: ComponentFixture<VariationCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
