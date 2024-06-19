import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusketComponent } from './busket.component';

describe('BusketComponent', () => {
  let component: BusketComponent;
  let fixture: ComponentFixture<BusketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusketComponent]
    });
    fixture = TestBed.createComponent(BusketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
