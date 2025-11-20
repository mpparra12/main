import { Component } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptionsNonAxis = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions?: ApexPlotOptions;
  labels?: string[];
  colors?: string[];
};

@Component({
  selector: 'app-logistic',
  imports: [NgApexchartsModule],
  templateUrl: './logistic.html',
  styleUrl: './logistic.scss'
})
export class Logistic {
  // === KPIs ===
  inventarioTotal = 1200000; // bbl
  capacidadAlmacenamiento = 1500000; // bbl
  camionesActivos = 15;
  camionesProgramados = 20;
  barcosEnTransito = 2;
  barcosProgramados = 3;
  demoraPromedio = 3; // horas

  // === Inventario gráfico (donut) ===
  public chartInventario: Partial<ChartOptionsNonAxis>| any  = {
    series: [500000, 400000, 200000, 100000], // petróleo, gas, diesel, lubricantes
    chart: { type: 'donut', height: 300 },
    labels: ['Petróleo', 'Gas', 'Diesel', 'Lubricantes'],
    colors: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'],
    plotOptions: { pie: { donut: { size: '60%' } } },
  };

  // === Transporte terrestre ===
  camiones = [
    { id: 'C-101', ruta: 'Planta A → Refinería', estado: 'En tránsito', carga: 25000, eta: '14:30' },
    { id: 'C-102', ruta: 'Planta B → Puerto', estado: 'Retenido', carga: 20000, eta: '16:00' },
    { id: 'C-103', ruta: 'Planta C → Refinería', estado: 'En tránsito', carga: 22000, eta: '15:00' },
  ];

  // === Transporte marítimo ===
  barcos = [
    { id: 'B-301', origen: 'Puerto A', destino: 'Refinería X', estado: 'En tránsito', carga: 200000 },
    { id: 'B-302', origen: 'Puerto B', destino: 'Refinería Y', estado: 'Cargando', carga: 180000 },
  ];

  // === Alertas ===
  alertas = [
    { tipo: 'Retraso camión', severidad: 'Media', fecha: '2025-10-09', accion: 'Reprogramar ruta' },
    { tipo: 'Inventario bajo', severidad: 'Crítica', fecha: '2025-10-08', accion: 'Solicitar envío inmediato' },
  ];
}