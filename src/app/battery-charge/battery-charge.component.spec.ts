import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryChargeComponent } from './battery-charge.component';

describe('BatteryChargeComponent', () => {
  let component: BatteryChargeComponent;
  let fixture: ComponentFixture<BatteryChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
