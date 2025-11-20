import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logistic } from './logistic';

describe('Logistic', () => {
  let component: Logistic;
  let fixture: ComponentFixture<Logistic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logistic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logistic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
