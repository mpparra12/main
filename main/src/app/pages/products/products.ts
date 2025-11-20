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
  selector: 'app-products',
  imports: [NgApexchartsModule],
 
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  // === KPIs ===
  inventarioTotal = 150000; // bbl
  produccionDiaria = 12000; // bbl
  ventas = 10000; // bbl
  productosCriticos = 1;

  // === Producción por producto ===
  productos = [
    { nombre: 'Gasolina', produccionDiaria: 5000, produccionMensual: 120000, capacidad: 150000 },
    { nombre: 'Diésel', produccionDiaria: 4000, produccionMensual: 100000, capacidad: 120000 },
    { nombre: 'GLP', produccionDiaria: 3000, produccionMensual: 90000, capacidad: 100000 },
  ];

  public chartProduccion: Partial<ChartOptions> | any= {
    series: [
      { name: 'Producción diaria', data: [5000, 4000, 3000] },
      { name: 'Capacidad máxima', data: [150000, 120000, 100000] }
    ],
    chart: { type: 'bar', height: 300 },
    xaxis: { categories: ['Gasolina', 'Diésel', 'GLP'] },
    colors: ['#2563eb', '#10b981']
  };

  // === Inventario por ubicación ===
  inventario = [
    { producto: 'Gasolina', ubicacion: 'Planta A', stock: 20000, capacidad: 50000, estado: 'Normal' },
    { producto: 'Diésel', ubicacion: 'Planta B', stock: 15000, capacidad: 40000, estado: 'Alerta' },
    { producto: 'GLP', ubicacion: 'Planta C', stock: 5000, capacidad: 25000, estado: 'Crítico' },
  ];

  // === Distribución / ventas ===
  public chartDistribucion: Partial<ChartOptions> | any= {
    series: [
      { name: 'Distribución', data: [3000, 4000, 3000] }
    ],
    chart: { type: 'line', height: 300, toolbar: { show: false } },
    xaxis: { categories: ['Gasolina', 'Diésel', 'GLP'] },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#f59e0b']
  };

  // === Alertas de productos ===
  alertas = [
    { producto: 'GLP', ubicacion: 'Planta C', stock: 5000, estado: 'Crítico', accion: 'Reabastecer inmediatamente' }
  ];
}
