import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  title?: ApexTitleSubtitle;
};

@Component({
  selector: 'app-tab-generic',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, MatTableModule, MatButtonModule, MatCardModule],
  
  templateUrl: './tab-generic.html',
  styleUrl: './tab-generic.scss'
})
export class TabGeneric implements OnInit {
  @Input() title: string = 'Tab';
  @Input() chartType: 'bar' | 'line' | 'area' | 'pie' = 'bar';
  @Input() displayedColumns: string[] = ['fecha', 'valor', 'unidad'];
  @Input() dataSource: any[] = [];

  @ViewChild('chartObj') chartObj!: ChartComponent;
  @ViewChild('exportContainer') exportContainer!: ElementRef<HTMLDivElement>;

  chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    // Si no hay datos, genera datos de ejemplo
    if (!this.dataSource || this.dataSource.length === 0) {
      const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
      const data = labels.map(() => Math.floor(Math.random() * 100));
      this.dataSource = labels.map((label, i) => ({
        fecha: label,
        valor: data[i],
        unidad: 'bbl'
      }));
    }

    // Configuración según tipo de gráfico
    if (this.chartType === 'pie') {
      // Pie chart espera solo un arreglo numérico
      this.chartOptions = {
        series: this.dataSource.map(d => d.valor) as ApexNonAxisChartSeries,
        chart: { type: 'pie', height: 350 },
        title: { text: this.title }
      };
    } else {
      // Bar, line o area
      this.chartOptions = {
        series: [{ name: this.title, data: this.dataSource.map(d => d.valor) }] as ApexAxisChartSeries,
        chart: { type: this.chartType, height: 350 },
        xaxis: { categories: this.dataSource.map(d => d.fecha) },
        // 🔧 yaxis ahora nunca será undefined
        yaxis: { title: { text: 'Valor' } } as ApexYAxis,
        title: { text: this.title }
      };
    }
  }

  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), `${this.title}.xlsx`);
  }

  exportPDF() {
    if (!this.exportContainer) return;

    html2canvas(this.exportContainer.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${this.title}.pdf`);
    });
  }
}