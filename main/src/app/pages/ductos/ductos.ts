import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexPlotOptions,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptionsAxis = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  colors?: string[];
  legend?: ApexLegend;
  plotOptions?: ApexPlotOptions;
};

export type ChartOptionsNonAxis = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions?: ApexPlotOptions;
  colors?: string[];
};


@Component({
  selector: 'app-ductos',
  imports: [NgApexchartsModule],
  templateUrl: './ductos.html',
  styleUrl: './ductos.scss'
})
export class Ductos {
  // === KPIs ===
  capacidadTotal = 500000; // bbl/día
  flujoActual = 430000; // bbl/día
  presionPromedio = 1250; // psi
  estado = 'Normal';

  // === Flujo histórico (línea) ===
  public chartFlujo: Partial<ChartOptionsAxis> | any = {
    series: [
      {
        name: 'Flujo actual',
        data: [400000, 420000, 430000, 435000, 430000, 425000, 430000],
      },
      {
        name: 'Flujo planificado',
        data: [450000, 440000, 430000, 430000, 430000, 430000, 430000],
      },
    ],
    chart: { type: 'line', height: 300, toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#2563eb', '#f59e0b'],
    xaxis: { categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
    legend: { position: 'bottom' },
  };

  // === Presión promedio (radial) ===
  public chartPresion: Partial<ChartOptionsNonAxis> | any = {
    series: [1250],
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

  // === Utilización de capacidad (%) (radial) ===
  public chartCapacidad: Partial<ChartOptionsNonAxis> | any = {
    series: [(this.flujoActual / this.capacidadTotal) * 100],
    chart: { type: 'radialBar', height: 250, toolbar: { show: false } },
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        dataLabels: {
          name: { show: false },
          value: { fontSize: '24px', color: '#2563eb', offsetY: 8 },
        },
      },
    },
    colors: ['#2563eb'],
  };

  // === Tabla de ductos/tramos ===
  ductos = [
    { ducto: 'OD-01', tramo: 'A', flujo: 120000, presion: 1200, capacidad: 150000, estado: 'Normal' },
    { ducto: 'OD-01', tramo: 'B', flujo: 110000, presion: 1250, capacidad: 150000, estado: 'Alerta' },
    { ducto: 'GD-03', tramo: 'C', flujo: 90000, presion: 900, capacidad: 100000, estado: 'Normal' },
  ];

  // === Alertas recientes ===
  alertas = [
    { tipo: 'Presión alta', severidad: 'Crítica', fecha: '2025-10-09', accion: 'Reducir flujo inmediato' },
    { tipo: 'Flujo bajo', severidad: 'Media', fecha: '2025-10-08', accion: 'Verificar válvula de control' },
  ];
}
