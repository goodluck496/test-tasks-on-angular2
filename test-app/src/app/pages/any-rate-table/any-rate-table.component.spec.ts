import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyRateTablePageComponent } from './any-rate-table.component';

describe('AnyRateTableComponent', () => {
  let component: AnyRateTablePageComponent;
  let fixture: ComponentFixture<AnyRateTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnyRateTablePageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyRateTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
