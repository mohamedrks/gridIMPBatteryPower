import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatteryChargeComponent } from './battery-charge/battery-charge.component';

const routes: Routes = [
  { path: 'battery', component: BatteryChargeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
