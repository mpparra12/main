import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservoirs } from './reservoirs';

describe('Reservoirs', () => {
  let component: Reservoirs;
  let fixture: ComponentFixture<Reservoirs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservoirs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reservoirs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
