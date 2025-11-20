import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbyDetailComponent } from './listby-detail.component';

describe('ListbyDetailComponent', () => {
  let component: ListbyDetailComponent;
  let fixture: ComponentFixture<ListbyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListbyDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListbyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
