import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRatePageComponent } from './currency-rate.component';

describe('CurrencyRateComponent', () => {
  let component: CurrencyRatePageComponent;
  let fixture: ComponentFixture<CurrencyRatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyRatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyRatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
