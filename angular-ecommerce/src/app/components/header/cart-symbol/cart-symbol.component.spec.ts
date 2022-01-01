import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSymbolComponent } from './cart-symbol.component';

describe('CartSymbolComponent', () => {
  let component: CartSymbolComponent;
  let fixture: ComponentFixture<CartSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSymbolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
