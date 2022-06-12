import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GategoryCrudComponent } from './gategory-crud.component';

describe('GategoryCrudComponent', () => {
  let component: GategoryCrudComponent;
  let fixture: ComponentFixture<GategoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GategoryCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GategoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
