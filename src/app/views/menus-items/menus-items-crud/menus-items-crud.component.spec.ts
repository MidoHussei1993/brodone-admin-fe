import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusItemsCrudComponent } from './menus-items-crud.component';

describe('MenusItemsCrudComponent', () => {
  let component: MenusItemsCrudComponent;
  let fixture: ComponentFixture<MenusItemsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusItemsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusItemsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
