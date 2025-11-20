
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from "src/app/material.module";
import { OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ChartComponent,  ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HSETracker } from "src/app/components/hse-tracker/hse-tracker";

export type ChartOptionsAxis  = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  colors?: string[];
  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
};


@Component({
  selector: 'app-reservoirs',
  imports: [NgApexchartsModule, MaterialModule, CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './reservoirs.html',
  styleUrl: './reservoirs.scss'
})
export class Reservoirs {
  // === KPIs ===
  volumenOriginal = 120; // MMbbl
  recuperado = 38; // %
  presionActual = 2850; // psi
  integridad = 'Alta';
  /*kpis: any[] = [
          { title: 'Producción (BOPD)', value: 9500, color: 'bg-blue' },
          { title: 'OPEX (USD)', value: 490000, color: 'bg-green' },
          { title: 'Emisiones CO₂ (t)', value: 42, color: 'bg-gray' },
          { title: 'Incidentes', value: 0, color: 'bg-red' }];
         */

  // === Tendencia de Presión (gráfico de línea) ===
  public chartPresion: Partial<ChartOptionsAxis> | any= {
    series: [
      {
        name: 'Presión medida',
        data: [3100, 3050, 3000, 2950, 2900, 2870, 2850],
      },
      {
        name: 'Presión esperada',
        data: [3100, 3070, 3040, 3000, 2950, 2900, 2850],
      },
    ],
    chart: { type: 'line', height: 300, toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#2563eb', '#f59e0b'],
    xaxis: { categories: ['Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'] },
    legend: { position: 'bottom' },
  };

  // === Balance de Volúmenes (barras apiladas) ===
  public chartVolumen: Partial<ChartOptionsAxis> | any= {
    series: [
      { name: 'Petróleo', data: [60] },
      { name: 'Gas', data: [25] },
      { name: 'Agua', data: [15] },
    ],
    chart: { type: 'bar', height: 300, stacked: true, toolbar: { show: false } },
    plotOptions: {
      bar: { horizontal: true, borderRadius: 4 },
    },
    colors: ['#1d4ed8', '#10b981', '#93c5fd'],
    xaxis: { categories: ['Reservorio A'] },
    legend: { position: 'bottom' },
  };

  // === Pozos asociados al reservorio ===
  pozos = [
    { nombre: 'PZ-101', tipo: 'Productor', presion: 2800, caudal: 1250, estado: 'En producción' },
    { nombre: 'PZ-205', tipo: 'Inyector', presion: 3200, caudal: 0, estado: 'Inyección activa' },
    { nombre: 'PZ-317', tipo: 'Productor', presion: 2750, caudal: 980, estado: 'Producción estable' },
  ];
}
