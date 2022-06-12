import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GategoryListComponent } from './gategory-list.component';

describe('GategoryListComponent', () => {
  let component: GategoryListComponent;
  let fixture: ComponentFixture<GategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
