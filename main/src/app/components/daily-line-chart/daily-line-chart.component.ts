import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexStroke,
  ApexLegend,
  ApexGrid,
  ApexPlotOptions
} from 'ng-apexcharts';
import { DailyLineChartData } from 'src/app/models/daily-line-chart-data';
import { TimeData } from 'src/app/models/daily-line-chart-data';
import { colors } from 'src/app/consts/colors';
import { customTooltip } from 'src/app/consts/custom-tooltip';

import ApexCharts from 'apexcharts';
import { MaterialModule } from "src/app/material.module";

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  grid: ApexGrid;
};

enum matSelectedFields {
  daily = 'Daily',
  weekly = 'Weekly',
  monthly = 'Monthly'
}

@Component({
  selector: 'app-daily-line-chart',
  templateUrl: './daily-line-chart.component.html',
  styleUrls: ['./daily-line-chart.component.scss'],
  imports: [MaterialModule]
})
export class DailyLineChartComponent implements OnInit, OnChanges, AfterViewInit {
  //@Input() dailyLineChartData: DailyLineChartData;
  @Input() currentTheme: string;
  @Input() currentMode: string;
  @ViewChild('chart') chart: ElementRef;

  // @ts-ignore
  public chartObj: ApexCharts;
  public chartOptions: Partial<ChartOptions>;
  public matSelectFields: typeof matSelectedFields = matSelectedFields;
  public selectedMatSelectValue = matSelectedFields.monthly;
  public colors: typeof colors = colors;
  public dailyLineChartData!: Partial<DailyLineChartData> | any;
/// constructor
 
constructor() {
     this.dailyLineChartData = {
 
  
      dailyData: {
        mobile: [16, 46, 45, 12, 37, 16, 41, 13, 25, 22, 30],
        desktop: [42, 60, 49, 50, 13, 15, 16, 57, 56, 27, 43],
        tablet: [35, 25, 36, 30, 67, 35, 64, 12, 25, 36, 39]
      },
      weeklyData: {
        mobile: [23, 31, 45, 10, 37, 67, 43, 63, 15, 22, 30],
        desktop: [67, 60, 49, 50, 25, 15, 16, 57, 13, 27, 43],
        tablet: [56, 48, 23, 48, 13, 35, 64, 12, 45, 36, 39]
      },
      monthlyData: {
        mobile: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        desktop: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        tablet: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
      },
      labels: [
        '01/01/2024',
        '02/01/2024',
        '03/01/2024',
        '04/01/2024',
        '05/01/2024',
        '06/01/2024',
        '07/01/2024',
        '08/01/2024',
        '09/01/2024',
        '10/01/2024',
        '11/01/2024'
      ]
    
  }
}

////

  public ngOnInit(): void {
    this.initChart(this.dailyLineChartData.monthlyData, this.dailyLineChartData.labels);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTheme'] && changes['currentTheme'].currentValue && this.chartObj) {
      this.updateChartOptions();
    }
    if (changes['currentMode'] && changes['currentMode'].currentValue && this.chartObj) {
      this.updateChartOptions();
    }
  }

  public ngAfterViewInit() {
    this.chartObj = new ApexCharts(
      this.chart.nativeElement,
      this.chartOptions
    );

    this.chartObj.render();
    this.updateChartOptions();
  }

  private updateChartOptions(): void {
    this.chartObj.updateOptions({
      colors: [
        this.currentTheme === 'blue'
          ? colors.BLUE
          : this.currentTheme === 'green'
          ? colors.GREEN
          : colors.PINK,
        this.currentMode === 'dark'
          ? colors.DARK_BLUE
          : colors.LIGHT_BLUE,
        colors.YELLOW
      ]
    });
  }

  public initChart(data: TimeData, labels: string[]): void {
    this.chartOptions = {
      legend: {
        show: false
      },
      markers: {
        size: [0, 0, 5]
      },
      series: [
        {
          name: 'Perforation',
          type: 'line',
          data: data.mobile,
        },
        {
          name: 'Production',
          type: 'area',
          data: data.desktop
        },
        {
          name: 'Drilling',
          type: 'line',
          data: data.tablet
        }
      ],
      colors: [
        this.currentTheme === 'blue'
          ? colors.BLUE
          : this.currentTheme === 'green'
          ? colors.GREEN
          : colors.PINK,
        colors.LIGHT_BLUE,
        colors.YELLOW
      ],
      chart: {
        toolbar: {
          show: false
        },
        height: 350,
        width: '100%',
        type: 'line',
        stacked: true
      },
      stroke: {
        width: [2, 0, 2],
        curve: ['smooth', 'smooth', 'straight']
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          }
        },
      },
      fill: {
        opacity: 1,
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels,
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#4A4A4A',
            fontSize: '0.875rem',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            colors: '#4A4A4A',
            fontSize: '0.875rem',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
        },
      },
      tooltip: {
        custom: ({series, seriesIndex, dataPointIndex, w}) => {
          return customTooltip;
        }
      }
    };
  };

  public changedMatSelectionValue() {
    switch (this.selectedMatSelectValue) {
      case matSelectedFields.daily:
        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: 'Perforation',
              type: 'line',
              data: this.dailyLineChartData.dailyData.mobile,
            },
            {
              name: 'Production',
              type: 'area',
              data: this.dailyLineChartData.dailyData.desktop,
            },
            {
              name: 'Drilling',
              type: 'line',
              data: this.dailyLineChartData.dailyData.tablet,
            }
          ]
        };
        break;
      case matSelectedFields.weekly:
        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: 'Perforation',
              type: 'line',
              data: this.dailyLineChartData.weeklyData.mobile,
            },
            {
              name: 'Production',
              type: 'area',
              data: this.dailyLineChartData.weeklyData.desktop,
            },
            {
              name: 'Drilling',
              type: 'line',
              data: this.dailyLineChartData.weeklyData.tablet,
            }
          ]
        };
        break;
      default:
        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: 'Perforation',
              type: 'line',
              data: this.dailyLineChartData.monthlyData.mobile,
            },
            {
              name: 'Production',
              type: 'area',
              data: this.dailyLineChartData.monthlyData.desktop,
            },
            {
              name: 'Drilling',
              type: 'line',
              data: this.dailyLineChartData.monthlyData.tablet,
            }
          ]
        };
    }

  //this.chartObj.updateSeries(this.chartOptions.series);
  } 
}



/*
DASHBOARD

Vista general de pozos

Tabla con pozo, operador, estado, fecha de spud.

Tarjetas con total de pozos, pozos activos, pozos inactivos.

Producción

Gráfico de líneas con producción mensual (Oil, Gas, Water).
Gráfico de barras con producción acumulada por pozo.

Wellbores

Tabla con wellbores por pozo, fechas de inicio/fin.

Gráfico con número de wellbores por pozo.

Facilities

Tarjeta con número total de facilities.

Gráfico circular por tipo de facility (Plant, Tank, Pipeline…).

Mapa (opcional si cargas coordenadas)

Ubicación de pozos con sus surveys (Latitude/Longitude).


Pasos para armarlo en Power BI

Importar los datos

Abre Power BI Desktop.

Conéctate a tu SQL Server → selecciona la base donde cargaste ppdm_lite_sqlserver.sql.

Importa las tablas: WELL, WELLBORE, PRODUCTION, FACILITY, SURVEY.

Relaciones entre tablas

WELL.WELL_ID → WELLBORE.WELL_ID

WELL.WELL_ID → PRODUCTION.WELL_ID

WELL.WELL_ID → SURVEY.WELL_ID

Visualizaciones sugeridas

Cards → Total Wells, Producing Wells, Total Facilities.

Line Chart → Producción de Oil/Gas/Water en el tiempo (eje = PROD_DATE).

Bar Chart → Producción total por pozo.

Table → Detalle de pozos y operadores.

Pie Chart → Facilities por tipo.

Map (usando LATITUDE y LONGITUDE) → Localización de pozos.
*/