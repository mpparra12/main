import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGeneric } from './tab-generic';

describe('TabGeneric', () => {
  let component: TabGeneric;
  let fixture: ComponentFixture<TabGeneric>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabGeneric]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabGeneric);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
