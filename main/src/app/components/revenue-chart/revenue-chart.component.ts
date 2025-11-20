import { Component, Input, OnInit } from '@angular/core';
import { RevenueChartData } from 'src/app/models/revenue-chart-data';
import { colors } from 'src/app/consts/colors';
import { MaterialModule } from "src/app/material.module";



@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss'],
  imports: [MaterialModule]
})
export class RevenueChartComponent implements OnInit {
 // @Input() revenueCharData: RevenueChartData;
  public revenueChart: any;
  public colors: typeof colors = colors;
 public revenueCharData!: Partial<RevenueChartData> | any;
constructor() {
     this.revenueCharData =  {
      groupA: Math.round(Math.random() * 100),
      groupB: Math.round(Math.random() * 100),
      groupC: Math.round(Math.random() * 100),
      groupD: Math.round(Math.random() * 100)
    }
  }
////


  public ngOnInit(): void {
    this.initChart();
  }

  public initChart(): void {
    this.revenueChart = {
      color: [colors.GREEN, colors.PINK, colors.YELLOW, colors.BLUE],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: false
      },
      series: [{
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        label: {
          show: false
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        hoverAnimation: false,
        avoidLabelOverlap: false,
        data: [
          {
            name: 'Group A',
            value: this.revenueCharData.groupA
          },
          {
            name: 'Group B',
            value: this.revenueCharData.groupB
          },
          {
            name: 'Group C',
            value: this.revenueCharData.groupC
          },
          {
            name: 'Group D',
            value: this.revenueCharData.groupD
          },
        ]
      }]
    };
  }
}
