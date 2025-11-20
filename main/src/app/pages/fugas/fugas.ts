import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexStroke,
  NgApexchartsModule
} from 'ng-apexcharts';
import * as L from 'leaflet';
import { MaterialModule } from "src/app/material.module";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke?: ApexStroke;
  colors?: string[]; // <-- ya no usamos ApexColors
};
@Component({
  selector: 'app-fugas',
  imports: [NgApexchartsModule, MaterialModule,CommonModule],
  templateUrl: './fugas.html',
  styleUrl: './fugas.scss'
})
export class Fugas implements  AfterViewInit {

  map!: L.Map;
  now = new Date();

  fugas = [
    { id: 1, lat: 29.76, lng: -95.36, severity: 'High', location: 'Houston Pipeline A', time: '2025-10-29T08:00' },
    { id: 2, lat: 30.27, lng: -97.74, severity: 'Medium', location: 'Austin Storage Tank', time: '2025-10-29T09:30' },
    { id: 3, lat: 32.78, lng: -96.8, severity: 'Low', location: 'Dallas Valve Station', time: '2025-10-29T10:15' },
  ];

  kpis = [
    { label: 'Fugas activas', value: 3, icon: 'warning', color: '#ef4444' },
    { label: 'Severidad promedio', value: 'Media', icon: 'priority_high', color: '#f59e0b' },
    { label: 'Zonas afectadas', value: 3, icon: 'map', color: '#3b82f6' }
  ];

  alerts = [
    { msg: 'Fuga crítica detectada en Houston Pipeline A', level: 'Alta', time: 'Hace 2 min' },
    { msg: 'Presión anormal en válvula Dallas Station', level: 'Media', time: 'Hace 10 min' },
    { msg: 'Reporte de mantenimiento pendiente en Austin', level: 'Baja', time: 'Hace 25 min' },
  ];

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('fugasMap', {
      center: [30.5, -97.5],
      zoom: 6
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.fugas.forEach(f => {
      const color = f.severity === 'High' ? 'red' : f.severity === 'Medium' ? 'orange' : 'green';
      const marker = L.circleMarker([f.lat, f.lng], {
        radius: 10,
        color: '#000',
        fillColor: color,
        fillOpacity: 0.8
      }).addTo(this.map);

      marker.bindPopup(`
        <b>${f.location}</b><br>
        Severidad: ${f.severity}<br>
        Hora: ${new Date(f.time).toLocaleTimeString()}
      `);
    });
  }

  // === Gráfico de tendencias (fugas por día) ===
  public chartFugas: Partial<ChartOptions> | any = {
    series: [
      { name: 'Fugas detectadas', data: [1, 2, 3, 2, 3, 1, 3] }
    ],
    chart: { type: 'line', height: 300, toolbar: { show: false } },
    xaxis: { categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#ef4444'] // rojo para alertas
  };
}