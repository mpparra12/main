import { Component, Input, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexStroke, ApexYAxis, ApexTitleSubtitle, ApexTooltip, ApexLegend, ApexGrid, ApexFill, ChartComponent } from 'ng-apexcharts';
import { ServerChartData } from 'src/app/models/server-chart-data';
import { colors } from 'src/app/consts/colors';
import { MaterialModule } from "src/app/material.module";



export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  dataLabels?: ApexDataLabels;
  yaxis?: ApexYAxis;
  labels?: string[];
  legend?: ApexLegend;
  grid?: ApexGrid;
  tooltip?: ApexTooltip;
  colors?: string[];
  fill?: ApexFill;
};

@Component({
  standalone: true,
  selector: 'app-server-chart',
  templateUrl: './server-chart.component.html',
  styleUrls: ['./server-chart.component.scss'],
  imports: [MaterialModule, ChartComponent]
})
export class ServerChartComponent implements OnInit {
 // @Input() serverChartData: ServerChartData;
   defaultChart: ApexChart = {
    type: 'line',
    height: 300,
  };
  public charts: Partial<ChartOptions>[];
  public serverDataTitles: string[];
  public colors: typeof colors = colors;


  /////
   public serverChartData!: Partial<ServerChartData> | any;
  constructor() {
       this.serverChartData =  {

      firstServerChartData: [
        18107.85,
        49128.0,
        38122.9,
        28965.5,
        49340.7
      ],
      firstDataTitle: '45% / 78°С / 78 Ghz',
      secondServerChartData: [
        18423.7,
        48423.5,
        28514.3,
        48481.85,
        18487.7
      ],
      secondDataTitle: '57% / 45°С / 54 Ghz',
      thirdServerChartData: [
        17114.25,
        27126.6,
        47116.95,
        37203.7,
        17233.75
      ],
      thirdDataTitle: '87% / 55°С / 76 Ghz',
      dates: [
        '13 Nov 2017',
        '14 Nov 2017',
        '15 Nov 2017',
        '16 Nov 2017',
        '17 Nov 2017'
      ]
       }
  }

  /////
  public ngOnInit(): void {
    this.charts = [
      this.initChart(this.serverChartData.firstServerChartData, colors.PINK),
      this.initChart(this.serverChartData.secondServerChartData, colors.BLUE),
      this.initChart(this.serverChartData.thirdServerChartData, colors.YELLOW)
    ];

    this.serverDataTitles = [
      this.serverChartData.firstDataTitle,
      this.serverChartData.secondDataTitle,
      this.serverChartData.thirdDataTitle,
    ]
  }

  public initChart(data: number[], color: string): Partial<ChartOptions> {
    return  {
      chart: {
        type: 'area',
        height: 80,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      series: [
        {
          name: 'STOCK ABC',
          data: data
        }
      ],
      colors: [color],
      fill: {
        type: 'solid',
        opacity: 0.3
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      labels: this.serverChartData.dates,
      xaxis: {
        type: 'datetime',
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        max: 50000,
        show: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false,
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        }
      },
      tooltip: {
        enabled: false
      }
    };
  }
}
