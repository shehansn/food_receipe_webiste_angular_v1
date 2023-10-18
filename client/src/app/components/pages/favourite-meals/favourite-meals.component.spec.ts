import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteMealsComponent } from './favourite-meals.component';

describe('FavouriteMealsComponent', () => {
  let component: FavouriteMealsComponent;
  let fixture: ComponentFixture<FavouriteMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteMealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
