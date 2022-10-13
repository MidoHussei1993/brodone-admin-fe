import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsCrudComponent } from './tags-crud.component';

describe('TagsCrudComponent', () => {
  let component: TagsCrudComponent;
  let fixture: ComponentFixture<TagsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
