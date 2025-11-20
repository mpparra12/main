import { Component, OnInit } from '@angular/core';
import { ChartComponent, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexNonAxisChartSeries, ApexLegend, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material.module";

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title?: ApexTitleSubtitle;
};

export type StackedBarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title?: ApexTitleSubtitle;
};


@Component({
  selector: 'app-cost',
  imports: [CommonModule, FormsModule, NgApexchartsModule, MaterialModule],
  templateUrl: './cost.html',
  styleUrl: './cost.scss'
})
export class Cost implements OnInit {
  registros: any[] = [];
  registrosFiltrados: any[] = [];

  filtroArea: string = 'Todos';
  filtroTipo: string = 'Todos';
  filtroProyecto: string = 'Todos';
  filtroFecha: string = '';

  donutChartOptions!: DonutChartOptions;
  lineChartOptions!: LineChartOptions;
  stackedBarChartOptions!: StackedBarChartOptions;

  ngOnInit(): void {
    // Datos de ejemplo
    this.registros = [
      { fecha: '2025-09-01', area: 'Planta Norte', proyecto: 'Expansión A', tipo: 'CAPEX', montoPlan: 500000, montoReal: 520000 },
      { fecha: '2025-09-01', area: 'Planta Sur', proyecto: 'Mantenimiento B', tipo: 'OPEX', montoPlan: 120000, montoReal: 115000 },
      { fecha: '2025-09-02', area: 'Oleoducto Central', proyecto: 'Reparación C', tipo: 'OPEX', montoPlan: 80000, montoReal: 90000 },
      { fecha: '2025-09-03', area: 'Pozo A-101', proyecto: 'Perforación D', tipo: 'CAPEX', montoPlan: 300000, montoReal: 310000 }
    ];
    this.registrosFiltrados = [...this.registros];
    this.configurarGraficas();
  }

  aplicarFiltros(): void {
    this.registrosFiltrados = this.registros.filter(r=>{
      const area = this.filtroArea==='Todos'||r.area===this.filtroArea;
      const tipo = this.filtroTipo==='Todos'||r.tipo===this.filtroTipo;
      const proyecto = this.filtroProyecto==='Todos'||r.proyecto===this.filtroProyecto;
      const fecha = !this.filtroFecha || r.fecha >= this.filtroFecha;
      return area && tipo && proyecto && fecha;
    });
    this.configurarGraficas();
  }

  limpiarFiltros(): void {
    this.filtroArea='Todos'; this.filtroTipo='Todos'; this.filtroProyecto='Todos'; this.filtroFecha=''; this.aplicarFiltros();
  }

  configurarGraficas(): void {
    // Donut: CAPEX vs OPEX
    const capex = this.registrosFiltrados.filter(r=>r.tipo==='CAPEX').reduce((sum,r)=>sum+r.montoReal,0);
    const opex = this.registrosFiltrados.filter(r=>r.tipo==='OPEX').reduce((sum,r)=>sum+r.montoReal,0);
    this.donutChartOptions = { series:[capex,opex], chart:{type:'donut',height:250}, labels:['CAPEX','OPEX'], legend:{position:'bottom'}, title:{text:'Distribución CAPEX vs OPEX', align:'center'} };

    // Línea: Evolución mensual (mock)
    this.lineChartOptions = { series:[{name:'CAPEX',data:[500000,520000,480000,510000,530000,500000,520000,510000,500000,530000,540000,520000]},
                                      {name:'OPEX',data:[120000,115000,130000,125000,140000,120000,118000,125000,130000,120000,115000,125000]}],
      chart:{type:'line',height:250}, xaxis:{categories:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']},
      title:{text:'Evolución mensual CAPEX & OPEX',align:'center'}};

    // Barra apilada: por área y tipo
    const areas = Array.from(new Set(this.registrosFiltrados.map(r=>r.area)));
    const capexSeries = areas.map(a=>({name:a, data:[this.registrosFiltrados.filter(r=>r.area===a && r.tipo==='CAPEX').reduce((sum,r)=>sum+r.montoReal,0)]}));
    const opexSeries = areas.map(a=>({name:a, data:[this.registrosFiltrados.filter(r=>r.area===a && r.tipo==='OPEX').reduce((sum,r)=>sum+r.montoReal,0)]}));
    this.stackedBarChartOptions = { series:[...capexSeries,...opexSeries], chart:{type:'bar',stacked:true,height:250}, xaxis:{categories:['Monto Real']}, title:{text:'CAPEX & OPEX por área',align:'center'} };
  }

  getTotalCAPEX(): number {
  return this.registrosFiltrados
             .filter(r => r.tipo === 'CAPEX')
             .reduce((sum, r) => sum + r.montoReal, 0);
}

getTotalOPEX(): number {
  return this.registrosFiltrados
             .filter(r => r.tipo === 'OPEX')
             .reduce((sum, r) => sum + r.montoReal, 0);
}

getMontoPlanificado(): number {
  return this.registrosFiltrados.reduce((sum, r) => sum + r.montoPlan, 0);
}

getDesviacionTotal(): number {
  return this.registrosFiltrados.reduce((sum, r) => sum + (r.montoReal - r.montoPlan), 0);
}

  exportarExcel(): void {
    const datos = this.registrosFiltrados.map(r=>({
      Fecha:r.fecha, Área:r.area, Proyecto:r.proyecto, Tipo:r.tipo,
      MontoPlan:r.montoPlan, MontoReal:r.montoReal, Diferencia:r.montoReal-r.montoPlan
    }));
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja,'CAPEX_OPEX');
    const buffer = XLSX.write(libro,{bookType:'xlsx',type:'array'});
    const blob = new Blob([buffer],{type:'application/octet-stream'});
    FileSaver.saveAs(blob, `capex_opex_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  async exportarPDFConGraficas() {
    const doc = new jsPDF('p','mm','a4');
    doc.setFontSize(14); doc.text('Reporte CAPEX & OPEX',14,20);
    doc.setFontSize(10); doc.text(`Fecha: ${new Date().toLocaleDateString()}`,14,28);
    doc.text(`Área: ${this.filtroArea} | Tipo: ${this.filtroTipo} | Proyecto: ${this.filtroProyecto} | Desde: ${this.filtroFecha||'---'}`,14,36);

    const donutSvg = document.querySelector('#donutChart svg') as SVGSVGElement;
    const lineSvg = document.querySelector('#lineChart svg') as SVGSVGElement;
    const barSvg = document.querySelector('#stackedBarChart svg') as SVGSVGElement;

    const svgs = [donutSvg,lineSvg,barSvg].filter(s=>s) as SVGSVGElement[];
    for(let i=0;i<svgs.length;i++){
      const imgData = await this.svgToDataURL(svgs[i]);
      doc.addImage(imgData,'PNG',14 + (i%2)*96, 40 + Math.floor(i/2)*70, 80,60);
    }

let finalY = (doc as any).lastAutoTable.finalY;
    const data = this.registrosFiltrados.map(r=>[
      r.fecha,r.area,r.proyecto,r.tipo,r.montoPlan,r.montoReal,r.montoReal-r.montoPlan
    ]);
    autoTable(doc,{startY:110, head:[['Fecha','Área','Proyecto','Tipo','Monto Plan','Monto Real','Diferencia']], body:data, styles:{fontSize:8}, headStyles:{fillColor:[41,128,185]}});
    doc.text(`Total registros: ${this.registrosFiltrados.length}`,14,finalY+10);
    doc.save(`capex_opex_${new Date().toISOString().slice(0,10)}.pdf`);
  }

  private svgToDataURL(svg: SVGSVGElement): Promise<string> {
    return new Promise(resolve=>{
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      const blob = new Blob([svgData],{type:'image/svg+xml;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      img.onload = ()=>{
        canvas.width = img.width; canvas.height = img.height; ctx.drawImage(img,0,0); URL.revokeObjectURL(url); resolve(canvas.toDataURL('image/png'));
      };
      img.src = url;
    });
  }
}
