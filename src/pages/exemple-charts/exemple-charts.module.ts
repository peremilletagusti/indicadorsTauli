import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExempleCharts } from './exemple-charts';

@NgModule({
  declarations: [
    ExempleCharts,
  ],
  imports: [
    IonicPageModule.forChild(ExempleCharts),
  ],
})
export class ExempleChartsPageModule {}
