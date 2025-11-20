import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { AppSalesProfitComponent } from 'src/app/components/sales-profit/sales-profit.component';
import { AppTotalFollowersComponent } from 'src/app/components/total-followers/total-followers.component';
import { AppTotalIncomeComponent } from 'src/app/components/total-income/total-income.component';
import { AppPopularProductsComponent } from 'src/app/components/popular-products/popular-products.component';
import { AppEarningReportsComponent } from 'src/app/components/earning-reports/earning-reports.component';
import { HSETracker } from "src/app/components/hse-tracker/hse-tracker";

import {  OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexStroke, ApexDataLabels, ApexTooltip, ApexLegend, ApexGrid } from 'ng-apexcharts';
import * as L from 'leaflet';
import { DailyProductionComp } from "src/app/components/daily-production-comp/daily-production-comp";

interface KPI {
  title: string;
  value: number;
  icon: string;
  unit?: string;
  color: string;
}

interface Alerta {
  tipo: string;
  fecha: string;
  severidad: 'High' | 'Medium' | 'Low';
}

interface Pozo {
  nombre: string;
  coords: [number, number];
  produccion: number;
  presion: number;
  temperatura: number;
  estado: string;
  marker?: L.CircleMarker;
}

@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppTotalIncomeComponent,
        
    CommonModule, FormsModule, MatCardModule, MatSelectModule,
    MatTableModule, MatIconModule, NgApexchartsModule,  AppTotalIncomeComponent,  DailyProductionComp
],
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent implements OnInit, AfterViewInit, OnDestroy {


 defaultChart: ApexChart = {
    type: 'line',
    height: 300,
  };
   campos = ['North Field', 'South Field', 'East Field'];
  selectedCampo = 'North Field';
  kpis: KPI[] = [];
  alertas: Alerta[] = [];
  pozos: Pozo[] = [];
  map!: L.Map;
  updateInterval: any;

  tendenciasChart: Partial<{
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    tooltip: ApexTooltip;
    legend: ApexLegend;
    grid: ApexGrid;
  }> = {};

  ngOnInit(): void {
    this.loadMockData();
  }

  ngAfterViewInit(): void {
    this.loadMap();
    this.updateInterval = setInterval(() => this.updatePozosData(), 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }

  loadMockData() {
    this.kpis = [
      { title: 'Total Production', value: 128500, icon: 'local_gas_station', unit: 'BOPD', color: 'grad-blue' },
      { title: 'Energy Consumed', value: 8600, icon: 'bolt', unit: 'MWh', color: 'grad-yellow' },
      { title: 'CAPEX', value: 13.2, icon: 'attach_money', unit: 'M USD', color: 'grad-green' },
      { title: 'Emissions CO₂', value: 455, icon: 'cloud', unit: 't', color: 'grad-orange' },
      { title: 'Incidents', value: 2, icon: 'warning', color: 'grad-red' },
      { title: 'Availability', value: 99.1, icon: 'speed', unit: '%', color: 'grad-purple' }
    ];

    this.alertas = [
      { tipo: 'High pressure in Well 105', fecha: '2025-10-29 08:30', severidad: 'High' },
      { tipo: 'Leak detected on south line', fecha: '2025-10-29 09:45', severidad: 'Medium' },
      { tipo: 'Sensor desconectado', fecha: '2025-10-29 11:10', severidad: 'Low' }
    ];

    this.tendenciasChart = {
      series: [
        { name: 'Production (BOPD)', data: [115000,118500,121000,124000,126000,128500,129000] },
        { name: 'Pressure (psi)', data: [3200,3240,3280,3350,3400,3420,3440] }
      ],
      chart: { type: 'area', height: 300, toolbar: { show: false } },
      stroke: { curve: 'smooth', width: 3 },
      dataLabels: { enabled: false },
      grid: { borderColor: '#e2e8f0' },
      legend: { position: 'top' },
      xaxis: { categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
      yaxis: { title: { text: 'Valores' } },
      tooltip: { theme: 'dark' }
    };

    this.pozos = [
      { nombre: 'Pozo Norte 1', coords: [5.1, -73.9], produccion: 4200, presion: 3350, temperatura: 86, estado: 'Producción Alta' },
      { nombre: 'Pozo Sur 3', coords: [3.5, -74.5], produccion: 2800, presion: 3100, temperatura: 82, estado: 'Mantenimiento' },
      { nombre: 'Planta Central', coords: [4.2, -74.0], produccion: 5000, presion: 3400, temperatura: 88, estado: 'Operativa' }
    ];
  }

  loadMap() {
    this.map = L.map('map', {
      center: [4.5, -74.1],
      zoom: 6
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.pozos.forEach(p => {
      const marker = L.circleMarker(p.coords, {
        color: this.getEstadoColor(p.estado),
        radius: 8,
        fillOpacity: 0.8
      }).addTo(this.map);

      marker.bindPopup(this.buildPopup(p));
      p.marker = marker;
    });
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'Producción Alta': return 'green';
      case 'Mantenimiento': return 'orange';
      case 'Operativa': return 'blue';
      default: return 'gray';
    }
  }

  buildPopup(pozo: Pozo): string {
    return `
      <b>${pozo.nombre}</b><br>
      Estado: ${pozo.estado}<br>
      Producción: ${pozo.produccion.toLocaleString()} BOPD<br>
      Presión: ${pozo.presion} psi<br>
      Temperatura: ${pozo.temperatura} °C<br>
      <small>Últ. actualización: ${new Date().toLocaleTimeString()}</small>
    `;
  }

  updatePozosData() {
    this.pozos.forEach(p => {
      // Simula fluctuaciones reales
      p.produccion += (Math.random() - 0.5) * 200;
      p.presion += (Math.random() - 0.5) * 30;
      p.temperatura += (Math.random() - 0.5) * 2;
      p.estado = p.produccion < 3000 ? 'Mantenimiento' : p.produccion > 4000 ? 'Producción Alta' : 'Operativa';

      // Actualiza marcador y popup
      if (p.marker) {
        p.marker.setStyle({ color: this.getEstadoColor(p.estado) });
        p.marker.bindPopup(this.buildPopup(p));
      }
    });
  }
}