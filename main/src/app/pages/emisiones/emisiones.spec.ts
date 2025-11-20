import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emisiones } from './emisiones';

describe('Emisiones', () => {
  let component: Emisiones;
  let fixture: ComponentFixture<Emisiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emisiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emisiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
