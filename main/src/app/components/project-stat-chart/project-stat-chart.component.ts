import { Component, Input, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexStroke, ApexYAxis, ApexTitleSubtitle, ApexLegend, ApexGrid, ApexFill, ChartComponent } from 'ng-apexcharts';
import { ProjectStatData } from 'src/app/models/project-stat-data';
import { ProjectTimeData } from 'src/app/models/project-stat-data';
import { colors } from 'src/app/consts/colors';

import { ServerChartData } from 'src/app/models/server-chart-data';


import { MaterialModule } from "src/app/material.module";

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
};

enum ProjectsType {
  lightBlue = 'lightBlue',
  SingApp = 'SingApp',
  RNS = 'RNS'
}

@Component({
  selector: 'app-project-stat-chart',
  templateUrl: './project-stat-chart.component.html',
  styleUrls: ['./project-stat-chart.component.scss'],
  imports: [MaterialModule, ChartComponent]
})
export class ProjectStatChartComponent implements OnInit {
  //@Input() projectsStatsData: ProjectStatData;
  public selectedStatsLightBlueData: ProjectTimeData;
  public selectedStatsSingAppData: ProjectTimeData;
  public selectedStatsRNSData: ProjectTimeData;
  public chartOptions: Partial<ChartOptions>;
  public projectsType: typeof ProjectsType = ProjectsType;
  public colors: typeof colors = colors;

////
 public projectsStatsData!: Partial<ProjectStatData> | any;
constructor() {
     this.projectsStatsData =  {
      lightBlue: {
        daily: {
          name: 'Production',
          users: '199',
          percent: -3.7,
          registrations: '33',
          bounce: '3.25%',
          views: '330',
          series: [
            { name: 'Net Profit', data: [210, 95, 155, 200, 61, 135, 63] }
          ]
        },
        week: {
          name: 'Production',
          users: '1293',
          percent: 3.1,
          registrations: '233',
          bounce: '3.1%',
          views: '2310',
          series: [
            { name: 'Net Profit', data: [65, 195, 135, 95, 72, 155, 200] }
          ]
        },
        monthly: {
          name: 'Production',
          users: '9991',
          percent: -3.1,
          registrations: '725',
          bounce: '3.3%',
          views: '12301',
          series: [
            { name: 'Net Profit', data: [152, 61, 142, 183, 74, 195, 210] }
          ]
        }
      },
      singApp: {
        daily: {
          name: 'Perforation',
          users: '121',
          percent: -3.2,
          registrations: '15',
          bounce: '3.01%',
          views: '302',
          series: [
            { name: 'Net Profit', data: [135, 65, 192, 215, 85, 154, 75] }
          ]
        },
        week: {
          name: 'Perforation',
          users: '956',
          percent: 2.9,
          registrations: '295',
          bounce: '3.15%',
          views: '2401',
          series: [
            { name: 'Net Profit', data: [78, 145, 186, 64, 78, 135, 224] }
          ]
        },
        monthly: {
          name: 'Perforation',
          users: '9982',
          percent: -3.23,
          registrations: '712',
          bounce: '3.2%',
          views: '12256',
          series: [
            { name: 'Net Profit', data: [59, 75, 153, 194, 87, 205, 215] }
          ]
        }
      },
      rns: {
        daily: {
          name: 'Drilling',
          users: '175',
          percent: -3.1,
          registrations: '31',
          bounce: '3.23%',
          views: '301',
          series: [
            { name: 'Net Profit', data: [205, 81, 175, 192, 52, 199, 206] }
          ]
        },
        week: {
          name: 'Drilling',
          users: '1395',
          percent: 3.21,
          registrations: '235',
          bounce: '3.23%',
          views: '2215',
          series: [
            { name: 'Net Profit', data: [51, 186, 159, 201, 72, 86, 212] }
          ]
        },
        monthly: {
          name: 'Drilling',
          users: '9125',
          percent: -3.3,
          registrations: '756',
          bounce: '3.1%',
          views: '12025',
          series: [
            { name: 'Net Profit', data: [161, 84, 151, 201, 45, 196, 57] }
          ]
        }
      }
    }
  }

/////

  public ngOnInit(): void {
    this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.daily;
    this.selectedStatsSingAppData = this.projectsStatsData.singApp.daily;
    this.selectedStatsRNSData = this.projectsStatsData.rns.daily;

    this.initChart();
  }

  public initChart(): void {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 100,
        width: 130,
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 5
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug'
        ],
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      tooltip: {
        y: {
          formatter(val) {
            return '$ ' + val + ' thousands';
          }
        }
      }
    };
  }

  public changeDateType(dateType: string, projectType: string): void {
    switch (projectType) {
      case this.projectsType.lightBlue:
        switch (dateType) {
          case 'Weekly':
            this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.week;
            break;
          case 'Monthly':
            this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.monthly;
            break;
          default:
            this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.daily;
        }
      break;
      case this.projectsType.SingApp:
        switch (dateType) {
          case 'Weekly':
            this.selectedStatsSingAppData = this.projectsStatsData.singApp.week;
            break;
          case 'Monthly':
            this.selectedStatsSingAppData = this.projectsStatsData.singApp.monthly;
            break;
          default:
            this.selectedStatsSingAppData = this.projectsStatsData.singApp.daily;
        }
      break;
      case this.projectsType.RNS:
        switch (dateType) {
          case 'Weekly':
            this.selectedStatsRNSData = this.projectsStatsData.rns.week;
            break;
          case 'Monthly':
            this.selectedStatsRNSData = this.projectsStatsData.rns.monthly;
            break;
          default:
            this.selectedStatsRNSData = this.projectsStatsData.rns.daily;
        }
      break;
    }
  }
}
