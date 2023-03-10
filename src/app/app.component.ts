import { Component, OnInit } from '@angular/core';
import { BatteryAction, BatteryData, BillPeriod } from './models/helper';
import { BatteryService } from './services/battery/battery.service';
import { BillingPeriodService } from './services/billing/billing.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  timeNow: string = '';
  action: string = '';
  liveBillingPeriod: string = '';
  liveCharginPerHour: number = 0;
  liveDisharginPerHour: number = 0;

  color: string = '#3DCC93';
  percentage: number = 0;
  arrayColor: any = [];
  totalPin = 12;
  pinColor = '#efefed';

  Battery_DATA: BatteryData[] = [];
  BillPeriod_DATA: BillPeriod[] = [];
  displayedColumns: string[] = [
    'period',
    'action',
    'billingPeriod',
    'stateofcharging',
    'charging',
    'discharging',
  ];
  dataSource: BatteryData[];

  constructor(
    private batteryService: BatteryService,
    private billingPeriodService: BillingPeriodService
  ) {
    this.dataSource = this.Battery_DATA;
    this.billingPeriodService
      .getBillingPeriodData()
      .subscribe((billingPeriodsData: any[]) => {
        this.BillPeriod_DATA = billingPeriodsData;
      });
  }

  ngOnInit(): void {
    this.batteryService.getBatteryData().subscribe((batteryData: any[]) => {

      this.dataSource = Array.from({ length: batteryData.length }, (_, k) =>
        this.createBatteryData(k, batteryData)
      );

      const promise = new Promise((resolve, reject) => {

        const time = this.batteryService.getCurrentTime();
        let currentBatteryPeriod = time.Hour * 2;
        if (time.Minute <= 30) {
          currentBatteryPeriod++;
        }
        if (time.Minute > 30) {
          currentBatteryPeriod = currentBatteryPeriod + 2;
        }

        const batteryPeriod = batteryData.find(
          (p) => p.Period == currentBatteryPeriod
        );
        this.timeNow = time.Hour + '      ' + time.Minute;
        this.action = this.getDisplayText(
          batteryPeriod?.Action || 'Error Battery'
        );
        this.percentage = batteryPeriod?.['State-of-Charge'] || 0;
        this.liveBillingPeriod =
          this.dataSource.find((d) => Number(d.period) == currentBatteryPeriod)
            ?.billingPeriod || '';
        this.liveCharginPerHour =
          this.dataSource.find((d) => Number(d.period) == currentBatteryPeriod)
            ?.charging || 0;
        this.liveDisharginPerHour =
          this.dataSource.find((d) => Number(d.period) == currentBatteryPeriod)
            ?.discharging || 0;

        resolve([
          this.percentage,
          this.liveBillingPeriod,
          this.liveCharginPerHour,
          this.liveDisharginPerHour,
        ]);
      });

      promise.then(() => {
        this.renderArrayColor();
      });
    });
  }

  // Table data modifer.
  createBatteryData(id: number, dataB: any[]): BatteryData {
    return {
      action: dataB[id]?.Action,
      period: dataB[id]?.Period,
      billingPeriod:
        this.BillPeriod_DATA.find((p) => p.period == dataB[id]?.Period)?.time ||
        '',
      stateofcharging: dataB[id]?.['State-of-Charge'],
      charging: dataB[id]?.['Charged-kwH'],
      discharging: dataB[id]?.['Discharged-kwH'],
    };
  }

  // Battery status display text.
  getDisplayText(text: string): string {
    switch (text) {
      case 'CHARGE': {
        return BatteryAction.CHARGE;
      }
      case 'NONE': {
        return BatteryAction.NONE;
      }
      case 'DISCHARGE': {
        return BatteryAction.DISCHARGE;
      }
      default: {
        return '';
      }
    }
  }

  // Battery cell making method.
  renderArrayColor() {
    const part = 100 / this.totalPin;
    let currentLevel = 0 + part;
    for (let i = 0; i < this.totalPin; i++) {
      if (this.percentage >= currentLevel) {
        this.arrayColor.push({ full: true, color: this.color, width: '7px' });
        currentLevel += part;
      } else {
        const newWidth = ((this.percentage - currentLevel + part) * 7) / 20;
        this.arrayColor.push({
          full: false,
          color: this.pinColor,
          width: newWidth + 'px',
        });
        for (let j = i + 1; j < this.totalPin; j++) {
          this.arrayColor.push({
            full: true,
            color: this.pinColor,
            width: '7px',
          });
        }
        break;
      }
    }
    console.log(this.arrayColor);
  }
}
