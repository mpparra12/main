import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWells } from './import-wells';

describe('ImportWells', () => {
  let component: ImportWells;
  let fixture: ComponentFixture<ImportWells>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportWells]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportWells);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
