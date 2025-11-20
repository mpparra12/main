import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drilling } from './drilling';

describe('Drilling', () => {
  let component: Drilling;
  let fixture: ComponentFixture<Drilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drilling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
