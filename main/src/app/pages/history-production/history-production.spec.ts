import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryProduction } from './history-production';

describe('HistoryProduction', () => {
  let component: HistoryProduction;
  let fixture: ComponentFixture<HistoryProduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryProduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryProduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
