import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSlideLogoComponent } from './auto-slide-logo.component';

describe('AutoSlideLogoComponent', () => {
  let component: AutoSlideLogoComponent;
  let fixture: ComponentFixture<AutoSlideLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoSlideLogoComponent]
    });
    fixture = TestBed.createComponent(AutoSlideLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
