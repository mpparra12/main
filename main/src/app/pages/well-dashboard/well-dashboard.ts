import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexStroke, ApexDataLabels, ApexTooltip } from 'ng-apexcharts';
import { MaterialModule } from "src/app/material.module";
import { AppSalesProfitComponent } from "src/app/components/sales-profit/sales-profit.component";
import { AppTotalFollowersComponent } from "src/app/components/total-followers/total-followers.component";
import { AppTotalIncomeComponent } from "src/app/components/total-income/total-income.component";
import { AppPopularProductsComponent } from "src/app/components/popular-products/popular-products.component";
import { AppEarningReportsComponent } from "src/app/components/earning-reports/earning-reports.component";

interface PozoData {
  kpis: any[];
  tendencias: ApexAxisChartSeries;
  alertas: any[];
}

@Component({
  selector: 'app-well-dashboard',
  imports: [CommonModule, FormsModule, MatTabsModule, MatCardModule, MatTableModule, NgApexchartsModule, MaterialModule, AppSalesProfitComponent, AppTotalFollowersComponent, AppTotalIncomeComponent, AppPopularProductsComponent, AppEarningReportsComponent],
  templateUrl: './well-dashboard.html',
  styleUrl: './well-dashboard.scss'
})
export class WellDashboard implements OnInit {
  pozos = ['PZ-101', 'PZ-205', 'PZ-303'];
  selectedPozo = 'PZ-101';
  pozoData: Record<string, PozoData> = {};
  
 defaultChart: ApexChart = {
    type: 'line',
    height: 300,
  };

  // Datos dinámicos
  kpis: any[] = [];
  alertas: any[] = [];
  productionChart: Partial<{
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    tooltip: ApexTooltip;
  }> = {};

  ngOnInit(): void {
    this.loadMockData();
    this.updateDashboard();
  }

  loadMockData() {
    this.pozoData = {
      'PZ-101': {
        kpis: [
          { title: 'Producción (BOPD)', value: 12500, color: 'bg-blue' },
          { title: 'OPEX (USD)', value: 560000, color: 'bg-green' },
          { title: 'Emisiones CO₂ (t)', value: 48, color: 'bg-gray' },
          { title: 'Incidentes', value: 1, color: 'bg-red' }
        ],
        tendencias: [
          { name: 'Producción', data: [11000,11400,11900,12200,12500,12700,13000] },
          { name: 'Presión', data: [3200,3250,3300,3400,3450,3550,3600] },
          { name: 'Temperatura', data: [80,82,84,83,85,87,88] }
        ],
        alertas: [
          { tipo: 'Presión Alta', fecha: '2025-10-23 08:15', severidad: 'Alta' },
          { tipo: 'Caudal bajo', fecha: '2025-10-23 09:10', severidad: 'Media' }
        ]
      },
      'PZ-205': {
        kpis: [
          { title: 'Producción (BOPD)', value: 9500, color: 'bg-blue' },
          { title: 'OPEX (USD)', value: 490000, color: 'bg-green' },
          { title: 'Emisiones CO₂ (t)', value: 42, color: 'bg-gray' },
          { title: 'Incidentes', value: 0, color: 'bg-red' }
        ],
        tendencias: [
          { name: 'Producción', data: [9000,9050,9100,9200,9300,9400,9500] },
          { name: 'Presión', data: [3000,3050,3080,3100,3120,3140,3180] },
          { name: 'Temperatura', data: [78,79,80,81,82,83,84] }
        ],
        alertas: [
          { tipo: 'Temperatura fuera de rango', fecha: '2025-10-23 10:30', severidad: 'Media' }
        ]
      },
      'PZ-303': {
        kpis: [
          { title: 'Producción (BOPD)', value: 13400, color: 'bg-blue' },
          { title: 'OPEX (USD)', value: 630000, color: 'bg-green' },
          { title: 'Emisiones CO₂ (t)', value: 51, color: 'bg-gray' },
          { title: 'Incidentes', value: 2, color: 'bg-red' }
        ],
        tendencias: [
          { name: 'Producción', data: [12500,12800,13000,13200,13300,13350,13400] },
          { name: 'Presión', data: [3400,3420,3450,3470,3500,3520,3550] },
          { name: 'Temperatura', data: [82,83,84,84,85,86,87] }
        ],
        alertas: [
          { tipo: 'Vibración Alta', fecha: '2025-10-23 07:30', severidad: 'Alta' },
          { tipo: 'Falla sensor', fecha: '2025-10-23 09:00', severidad: 'Baja' }
        ]
      }
    };
  }

  updateDashboard() {
    const data = this.pozoData[this.selectedPozo];
    this.kpis = data.kpis;
    this.alertas = data.alertas;
    this.productionChart = {
      series: data.tendencias,
      chart: { type: 'line', height: 350, toolbar: { show: false } },
      xaxis: { categories: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'] },
      yaxis: { title: { text: 'Valores Operativos' } },
      stroke: { curve: 'smooth', width: 2 },
      dataLabels: { enabled: false },
      tooltip: { theme: 'dark' },
      title: { text: `Tendencias - ${this.selectedPozo}`, align: 'left' }
    };
  }
}