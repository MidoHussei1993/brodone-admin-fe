import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusCrudComponent } from './menus-crud.component';

describe('MenusCrudComponent', () => {
  let component: MenusCrudComponent;
  let fixture: ComponentFixture<MenusCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
