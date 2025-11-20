import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexYAxis,
  ApexFill,
  ChartComponent,
  NgApexchartsModule
} from 'ng-apexcharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HSETracker } from "src/app/components/hse-tracker/hse-tracker";
import { HSETrackerData } from 'src/app/models/HSE-track-data';
import { Observable, Subscribable } from 'rxjs';

export interface PozoForecast {
  pozo: string;
  fecha: string;
  produccion: number;
  pronostico: number;
  limiteSuperior: number;
  limiteInferior: number;
}

export interface PozoFinanciero {
  pozo: string;
  fecha: string;
  ingreso: number;
  capex: number;
  opex: number;
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  fill: ApexFill;
};

@Component({
  selector: 'app-forecast',
  imports: [CommonModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, HSETracker],
  templateUrl: './forecast.html',
  styleUrl: './forecast.scss'
})
export class Forecast  implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  @ViewChild('chartFin') chartFin!: ChartComponent;
public currentTheme = '';
  // =================== TAB PRODUCCIÓN ===================
  selectedTab: 'produccion' | 'financiero' = 'produccion';

  pozos: string[] = [];
  selectedPozo = '';
  registros: PozoForecast[] = [];
  registrosFiltrados: PozoForecast[] = [];

  public chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: { type: 'line', height: 400 },
    xaxis: { categories: [] },
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    tooltip: { enabled: true },
    yaxis: { title: { text: 'Producción (bbl/día)' } },
    fill: { opacity: 0.8 }
  };

  // =================== TAB FINANCIERO ===================
  pozosFinancieros: string[] = [];
  selectedPozoFin = '';
  registrosFinancieros: PozoFinanciero[] = [];
  registrosFinFiltrados: PozoFinanciero[] = [];

  public chartFinOptions: Partial<ChartOptions> = {
    series: [],
    chart: { type: 'line', height: 400 },
    xaxis: { categories: [] },
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    tooltip: { enabled: true },
    yaxis: { title: { text: 'USD ($)' } },
    fill: { opacity: 0.8 }
  };

  displayedColumnsFin: string[] = ['fecha', 'ingreso', 'capex', 'opex', 'margen'];
  dataSourceFin = new MatTableDataSource<any>([]);
  public HSETrackerData$: Observable<HSETrackerData>;


  constructor(private http: HttpClient,private service: DashboardService,) {

    this.HSETrackerData$ = this.service.loadVisitsChartData();
  }

  ngOnInit(): void {
    this.cargarDatosProduccion();
    this.cargarDatosFinancieros();
  }

  // =================== PRODUCCIÓN ===================
  cargarDatosProduccion() {
    this.http.get<PozoForecast[]>('/api/forecast').subscribe({
      next: (data) => {
        this.registros = data;
        this.pozos = [...new Set(data.map(r => r.pozo))];
        this.selectedPozo = this.pozos[0];
        this.actualizarFiltro();
      },
      error: (err) => console.error('Error cargando forecast', err)
    });
  }

  actualizarFiltro() {
    this.registrosFiltrados = this.registros.filter(r => r.pozo === this.selectedPozo);
    this.actualizarGrafica();
  }

  actualizarGrafica() {
    const fechas = this.registrosFiltrados.map(r => r.fecha);
    const produccion = this.registrosFiltrados.map(r => r.produccion);
    const pronostico = this.registrosFiltrados.map(r => r.pronostico);
    const superior = this.registrosFiltrados.map(r => r.limiteSuperior);
    const inferior = this.registrosFiltrados.map(r => r.limiteInferior);

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        { name: 'Producción real', data: produccion },
        { name: 'Pronóstico', data: pronostico },
        { name: 'Límite superior', data: superior },
        { name: 'Límite inferior', data: inferior }
      ],
      xaxis: { categories: fechas }
    };
  }

  getProduccionPromedio(): number {
    return this.registrosFiltrados.reduce((sum, r) => sum + r.produccion, 0) / (this.registrosFiltrados.length || 1);
  }

  getPronosticoPromedio(): number {
    return this.registrosFiltrados.reduce((sum, r) => sum + r.pronostico, 0) / (this.registrosFiltrados.length || 1);
  }

  getVariacion(): number {
    const real = this.getProduccionPromedio();
    const forecast = this.getPronosticoPromedio();
    return real ? ((forecast - real) / real) * 100 : 0;
  }

  exportarExcel() {
    const ws = XLSX.utils.json_to_sheet(this.registrosFiltrados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Forecast');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buffer]), `forecast_${this.selectedPozo}.xlsx`);
  }

  // =================== FINANCIERO ===================
  cargarDatosFinancieros() {
    this.http.get<PozoFinanciero[]>('/api/forecast-financiero').subscribe({
      next: (data) => {
        this.registrosFinancieros = data;
        this.pozosFinancieros = [...new Set(data.map(r => r.pozo))];
        this.selectedPozoFin = this.pozosFinancieros[0];
        this.actualizarFiltroFinanciero();
      },
      error: (err) => console.error('Error cargando forecast financiero', err)
    });
  }

  actualizarFiltroFinanciero() {
    this.registrosFinFiltrados = this.registrosFinancieros.filter(r => r.pozo === this.selectedPozoFin);
    this.actualizarGraficaFinanciera();

    // Actualizar tabla
    const tableData = this.registrosFinFiltrados.map(r => ({
      fecha: r.fecha,
      ingreso: r.ingreso,
      capex: r.capex,
      opex: r.opex,
      margen: r.ingreso ? ((r.ingreso - (r.capex + r.opex)) / r.ingreso) * 100 : 0
    }));
    this.dataSourceFin.data = tableData;
  }

  actualizarGraficaFinanciera() {
    const fechas = this.registrosFinFiltrados.map(r => r.fecha);
    const ingresos = this.registrosFinFiltrados.map(r => r.ingreso);
    const capex = this.registrosFinFiltrados.map(r => r.capex);
    const opex = this.registrosFinFiltrados.map(r => r.opex);

    this.chartFinOptions = {
      ...this.chartFinOptions,
      series: [
        { name: 'Ingresos', data: ingresos },
        { name: 'CAPEX', data: capex },
        { name: 'OPEX', data: opex }
      ],
      xaxis: { categories: fechas }
    };
  }

  getIngresoPromedio(): number {
    return this.registrosFinFiltrados.reduce((sum, r) => sum + r.ingreso, 0) / (this.registrosFinFiltrados.length || 1);
  }

  getCostoPromedio(): number {
    return this.registrosFinFiltrados.reduce((sum, r) => sum + (r.capex + r.opex), 0) / (this.registrosFinFiltrados.length || 1);
  }

  getMargenPromedio(): number {
    const ingresos = this.getIngresoPromedio();
    const costos = this.getCostoPromedio();
    return ingresos ? ((ingresos - costos) / ingresos) * 100 : 0;
  }

  exportarExcelFinanciero() {
    const ws = XLSX.utils.json_to_sheet(this.registrosFinFiltrados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Financiero');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buffer]), `forecast_financiero_${this.selectedPozoFin}.xlsx`);
  }
}