import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingPageComponent } from './briefing-page.component';

describe('BriefingPageComponent', () => {
  let component: BriefingPageComponent;
  let fixture: ComponentFixture<BriefingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BriefingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
