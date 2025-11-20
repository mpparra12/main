import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostProduction } from './cost-production';

describe('CostProduction', () => {
  let component: CostProduction;
  let fixture: ComponentFixture<CostProduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostProduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostProduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
