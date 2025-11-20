import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ductos } from './ductos';

describe('Ductos', () => {
  let component: Ductos;
  let fixture: ComponentFixture<Ductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
