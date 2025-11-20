import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fugas } from './fugas';

describe('Fugas', () => {
  let component: Fugas;
  let fixture: ComponentFixture<Fugas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fugas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fugas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
