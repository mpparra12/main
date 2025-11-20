import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyProduction } from './daily-production';

describe('DailyProduction', () => {
  let component: DailyProduction;
  let fixture: ComponentFixture<DailyProduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyProduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyProduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
