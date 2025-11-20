import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexPlotOptions,
    NgApexchartsModule,
    ApexFill,
    ApexGrid,
    ApexXAxis,
    ApexYAxis,
  ApexTitleSubtitle,

 
} from 'ng-apexcharts';

import { AppComponent } from 'src/app/app.component';
import { ChartConfiguration, ChartType } from 'chart.js';
import { MaterialModule } from "src/app/material.module";

// === Tipos para gráficos con ejes (líneas, barras) ===
export type ChartOptionsAxis = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  colors?: string[];
  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
};

// === Tipos para gráficos sin ejes (radiales, pie, donut) ===
export type ChartOptionsNonAxis = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions?: ApexPlotOptions;
  colors?: string[];
  labels?: string[];
  fill?: ApexFill;
};


@Component({
  selector: 'app-drilling',
  imports: [NgApexchartsModule, MaterialModule],
  templateUrl: './drilling.html',
  styleUrl: './drilling.scss'
})
export class Drilling {
  // === KPIs ===
  produccionDia = 1520;
  gasDia = 410;
  eficiencia = 92;
  alertasActivas = 3;

  // === Producción diaria (línea) ===
  public chartProduccion: Partial<ChartOptionsAxis> | any = {
    series: [
      { name: 'Petróleo (bbl)', data: [1100, 1150, 1200, 1300, 1400, 1450, 1520] },
      { name: 'Gas (Mcf)', data: [350, 370, 390, 400, 410, 405, 410] },
    ],
    chart: { type: 'line', height: 300, toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#2563eb', '#10b981'],
    xaxis: { categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
    legend: { position: 'bottom' },
  };

  // === Eficiencia operativa (gauge tipo radial) ===
  public chartEficiencia: Partial<ChartOptionsNonAxis> | any = {
    series: [92],
    chart: { type: 'radialBar', height: 250, toolbar: { show: false } },
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        dataLabels: {
          name: { show: false },
          value: { fontSize: '24px', color: '#10b981', offsetY: 8 },
        },
      },
    },
    colors: ['#10b981'],
  };

  // === Alertas de producción (barras horizontales) ===
  public chartAlertas: Partial<ChartOptionsAxis> | any = {
    series: [
      {
        name: 'Frecuencia',
        data: [3, 5, 2, 1],
      },
    ],
    chart: { type: 'bar', height: 250, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
    xaxis: { categories: ['Alta presión', 'Bajo caudal', 'Temperatura alta', 'Sensor offline'] },
    colors: ['#ef4444'],
  };

  // === Tabla de alertas ===
  alertas = [
    { tipo: 'Alta presión', nivel: 'Crítica', fecha: '2025-10-08', accion: 'Reducir presión de cabeza' },
    { tipo: 'Bajo caudal', nivel: 'Alta', fecha: '2025-10-07', accion: 'Verificar válvula de choke' },
    { tipo: 'Sensor offline', nivel: 'Media', fecha: '2025-10-06', accion: 'Reiniciar dispositivo' },
  ];
}