import { Component, Input } from '@angular/core';
import { PerformanceChartData } from 'src/app/models/performance-chart-data';

import { MaterialModule } from "src/app/material.module";

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.scss'],
  imports: [MaterialModule]
})
export class PerformanceChartComponent {
  //@Input() performanceChartData: PerformanceChartData;
  @Input() currentTheme: string;

   public performanceChartData!: Partial<PerformanceChartData> | any;
  constructor() {
       this.performanceChartData = {
        integration: 40,
        sdk: 75
      }
    }
}
