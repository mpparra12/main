import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexNonAxisChartSeries,
  NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  labels?: string[];
  colors?: string[];
};

@Component({
  selector: 'app-quality',
  imports: [NgApexchartsModule],
  templateUrl: './quality.html',
  styleUrl: './quality.scss'
})
export class Quality {
  // === KPIs ===
  muestrasAnalizadas = 320;
  cumplimiento = 95; // %
  noConformidades = 16;
  ultimaActualizacion = '09/10/2025';

  // === Parámetros de laboratorio ===
  parametros = [
    { producto: 'Gasolina', densidad: 740, azufre: 0.02, octanaje: 95, viscosidad: 0.8, cumple: true },
    { producto: 'Diésel', densidad: 820, azufre: 0.04, octanaje: 50, viscosidad: 2.1, cumple: true },
    { producto: 'GLP', densidad: 520, azufre: 0.01, octanaje: '-', viscosidad: '-', cumple: true },
    { producto: 'Fuel Oil', densidad: 890, azufre: 1.5, octanaje: '-', viscosidad: 12.0, cumple: false },
  ];

  // === Cumplimiento por estándar ===
  public chartEstandares: Partial<ChartOptions>  | any = {
    series: [97, 94, 85, 100],
    chart: { type: 'radialBar', height: 320 },
    labels: ['ASTM D4814', 'ASTM D975', 'ISO 8217', 'API RP 505'],
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#6366f1']
  };

  // === Histórico de calidad (azufre) ===
  public chartHistorico: Partial<ChartOptions> | any = {
    series: [
      { name: 'Gasolina', data: [0.02, 0.03, 0.02, 0.025] },
      { name: 'Diésel', data: [0.05, 0.045, 0.04, 0.05] }
    ],
    chart: { type: 'line', height: 300, toolbar: { show: false } },
    xaxis: { categories: ['Jul', 'Ago', 'Sep', 'Oct'] },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#2563eb', '#f59e0b']
  };

  // === Alertas de calidad ===
  alertas = [
    { fecha: '09/10/2025', producto: 'Fuel Oil', parametro: 'Azufre', valor: '1.5%', limite: '1.0%', accion: 'Reprocesar' },
    { fecha: '08/10/2025', producto: 'Diésel', parametro: 'Viscosidad', valor: '2.5 cSt', limite: '2.0 cSt', accion: 'Revisar aditivo' }
  ];
}
