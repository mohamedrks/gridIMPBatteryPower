import { Component, OnInit } from '@angular/core';
import { Battery } from '../models/battery';
import { BatteryService } from '../services/battery/battery.service';

@Component({
  selector: 'app-battery-charge',
  templateUrl: './battery-charge.component.html',
  styleUrls: ['./battery-charge.component.scss'],
})
export class BatteryChargeComponent implements OnInit {
  constructor(private batteryService: BatteryService) {}

  ngOnInit(): void {
    this.batteryService.getBatteryData().subscribe((batteryData: Battery[]) => {
      console.log(batteryData);
      const time = this.batteryService.getCurrentPeriod();
      console.log('time now => ' + time);
      let currentBatteryPeriod = time.Hour;
      if (time.Minute > 30) {
        currentBatteryPeriod++;
      }
      console.log('Current Battery Status ');
      console.log(batteryData.find((p) => p.Period == currentBatteryPeriod));
    });
  }
}
