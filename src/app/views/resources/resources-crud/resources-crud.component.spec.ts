import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesCrudComponent } from './resources-crud.component';

describe('ResourcesCrudComponent', () => {
  let component: ResourcesCrudComponent;
  let fixture: ComponentFixture<ResourcesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
