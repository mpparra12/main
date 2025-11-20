import { Component } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexStroke,
  NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke?: ApexStroke;
  colors?: string[];
};

@Component({
  selector: 'app-plants',
  imports: [NgApexchartsModule],
  templateUrl: './plants.html',
  styleUrl: './plants.scss'
})
export class Plants {
  // === KPIs ===
  rendimientoPromedio = 85; // %
  disponibilidadEquipos = 92; // %
  eficienciaGlobal = 78; // %
  paradasNoPlanificadas = 2;

  // === Producción por planta ===
  plantasProduccion = [
    { planta: 'Planta A', producto: 'Petróleo', produccion: 85000, capacidad: 100000 },
    { planta: 'Planta B', producto: 'Gas', produccion: 60000, capacidad: 75000 },
  ];

  public chartProduccion: Partial<ChartOptions> | any = {
    series: [
      { name: 'Producción', data: [85000, 60000] },
      { name: 'Capacidad', data: [100000, 75000] }
    ],
    chart: { type: 'bar', height: 300 },
    xaxis: { categories: ['Planta A', 'Planta B'] },
    colors: ['#2563eb', '#10b981']
  };

  // === Disponibilidad de equipos ===
  equipos = [
    { id: 'C-101', tipo: 'Compresor', estado: 'Activo', disponibilidad: 95 },
    { id: 'B-202', tipo: 'Bomba', estado: 'Mantenimiento', disponibilidad: 80 },
    { id: 'R-303', tipo: 'Reactor', estado: 'Activo', disponibilidad: 92 },
  ];

  // === Eficiencia ===
  public chartEficiencia: Partial<ChartOptions> | any  = {
    series: [{ name: 'Eficiencia', data: [85, 78] }], // Planta A, Planta B
    chart: { type: 'line', height: 300, toolbar: { show: false } },
    xaxis: { categories: ['Planta A', 'Planta B'] },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#f59e0b']
  };

  // === Alertas y eventos ===
  alertas = [
    { tipo: 'Falla', planta: 'Planta A', equipo: 'Bomba B-202', severidad: 'Crítica', fecha: '2025-10-09', accion: 'Mantenimiento inmediato' },
    { tipo: 'Bajo rendimiento', planta: 'Planta B', equipo: 'Reactor R-303', severidad: 'Media', fecha: '2025-10-08', accion: 'Ajustar parámetros' },
  ];
}
