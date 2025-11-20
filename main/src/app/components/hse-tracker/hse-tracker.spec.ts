import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HSETracker } from './hse-tracker';

describe('HSETracker', () => {
  let component: HSETracker;
  let fixture: ComponentFixture<HSETracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HSETracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HSETracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
