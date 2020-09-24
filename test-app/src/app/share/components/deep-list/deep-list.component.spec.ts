import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepListComponent } from './deep-list.component';

describe('DeepListComponent', () => {
  let component: DeepListComponent;
  let fixture: ComponentFixture<DeepListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeepListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input contain truthy data', () => {

  })
});
