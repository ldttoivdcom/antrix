import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductServiceLayoutComponent } from './product-service-layout.component';

describe('ProductServiceLayoutComponent', () => {
  let component: ProductServiceLayoutComponent;
  let fixture: ComponentFixture<ProductServiceLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductServiceLayoutComponent]
    });
    fixture = TestBed.createComponent(ProductServiceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
