import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDashboard } from './well-dashboard';

describe('WellDashboard', () => {
  let component: WellDashboard;
  let fixture: ComponentFixture<WellDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
