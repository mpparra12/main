import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { VisitsChartData } from 'src/app/models/visits-chart-data';
import { colors } from 'src/app/consts/colors';
import { ChartOptions } from 'src/app/templates/chart-options';
import { MaterialModule } from "src/app/material.module";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-hse-tracker',
  imports: [MaterialModule],
  templateUrl: './hse-tracker.html',
  styleUrl: './hse-tracker.scss'
})
export class HSETracker implements  OnChanges, AfterViewInit {
  @Input() visitsChartData: VisitsChartData;
  @Input() currentTheme: string;
  @ViewChild('chart') chart: ElementRef;

  // @ts-ignore
  public chartObj: ApexCharts;
  public colors: typeof colors = colors;
  public chartOptions: Partial<ChartOptions>;
 public loadVisitsChartData!: Partial<VisitsChartData> | any;
constructor() {
     this.loadVisitsChartData = {
   
      data: [7, 6, 3, 8, 10, 6, 7, 8, 3, 0, 7, 6, 2, 7, 4, 7, 3, 6, 2, 3, 8, 1, 0, 4, 9],
      registration: '45',
      signOut: '147',
      rate: '351',
      all: '543'
    }
  }


 

  // tslint:disable-next-line:use-lifecycle-interface
  public ngOnInit(): void {
    this.initChart();
    
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTheme'].currentValue && this.chartObj) {
      this.chartObj.updateOptions({
        fill: {
          colors: [
            this.currentTheme === 'blue'
              ? colors.BLUE
              : this.currentTheme === 'green'
              ? colors.GREEN
              : colors.PINK
          ]
        }
      });
    }
  }


  
  public ngAfterViewInit() {
    this.chartObj = new ApexCharts(
      this.chart.nativeElement,
      this.chartOptions
    );

    this.chartObj.render();
  }

  public initChart(): void {
    this.chartOptions = {
      series: [77],
      chart: {
        height: 130,
        width: 130,
        type: 'radialBar',
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -180,
          endAngle: 180,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
              formatter(val) {
                return val + '%';
              }
            },
            show: false
          }
        }
      },
      fill: {
        colors: [
          this.currentTheme === 'blue'
            ? colors.BLUE
            : this.currentTheme === 'green'
            ? colors.GREEN
            : colors.PINK
        ]
      },
      stroke: {
        dashArray: 3
      }
    };
  }
}
