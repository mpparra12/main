import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ChartComponent, ApexChart, ApexNonAxisChartSeries, ApexLegend, ApexTitleSubtitle, ApexAxisChartSeries, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HSETracker } from "src/app/components/hse-tracker/hse-tracker";

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


@Component({
  selector: 'app-incidents',
  imports: [CommonModule, FormsModule, NgApexchartsModule, HSETracker],
  templateUrl: './incidents.html',
  styleUrl: './incidents.scss'
})
export class Incidents implements OnInit, AfterViewInit {
  @ViewChild('chart') chart!: ChartComponent;
  private map!: L.Map;

  donutChartOptions!: DonutChartOptions;
  lineChartOptions!: LineChartOptions;

  incidentes: any[] = [];
  incidentesFiltrados: any[] = [];

  filtroTipo: string = 'Todos';
  filtroSeveridad: string = 'Todos';
  filtroFecha: string = '';

  ngOnInit(): void {
    this.incidentes = [
      { fecha: '2025-09-12', ubicacion: 'Pozo A-101', tipo: 'Lesión', severidad: 'Leve', estado: 'Cerrado', coords: [5.345, -73.234] },
      { fecha: '2025-09-20', ubicacion: 'Planta Norte', tipo: 'Fuga', severidad: 'Moderado', estado: 'En investigación', coords: [5.367, -73.250] },
      { fecha: '2025-09-28', ubicacion: 'Oleoducto Central', tipo: 'Incendio', severidad: 'Grave', estado: 'Cerrado', coords: [5.352, -73.220] },
      { fecha: '2025-10-05', ubicacion: 'Terminal Marítimo', tipo: 'Derrame', severidad: 'Moderado', estado: 'Abierto', coords: [5.330, -73.210] },
      { fecha: '2025-10-07', ubicacion: 'Planta Sur', tipo: 'Lesión', severidad: 'Leve', estado: 'Abierto', coords: [5.358, -73.245] }
    ];
    this.incidentesFiltrados = [...this.incidentes];
    this.configurarGraficas();
  }

  ngAfterViewInit(): void { this.initMap(); }

  configurarGraficas(): void {
    const tipos = ['Lesión', 'Fuga', 'Incendio', 'Derrame'];
    const conteoPorTipo = tipos.map(t => this.incidentesFiltrados.filter(i => i.tipo === t).length);

    this.donutChartOptions = {
      series: conteoPorTipo,
      chart: { type: 'donut', height: 250 },
      labels: tipos,
      legend: { position: 'bottom' },
      title: { text: 'Distribución por tipo', align: 'center' }
    };

    this.lineChartOptions = {
      series: [{ name: 'Incidentes', data: [4, 6, 5, 7, 3, 2, 6, 4, 8, 3, 5, 4] }],
      chart: { type: 'line', height: 250 },
      xaxis: { categories: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'] },
      title: { text: 'Evolución mensual', align: 'center' }
    };
  }

  private initMap(): void {
    this.map = L.map('mapaIncidentes', { center: [5.34, -73.23], zoom: 12 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(this.map);
    this.actualizarMarcadores();
  }

  private actualizarMarcadores(): void {
    if (!this.map) return;
    (this.map as any)._layers && Object.values((this.map as any)._layers).forEach((layer: any) => { if(layer instanceof L.Marker) this.map.removeLayer(layer); });

    const icons = {
      Leve: L.icon({ iconUrl:'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png', iconSize:[32,32]}),
      Moderado: L.icon({ iconUrl:'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png', iconSize:[32,32]}),
      Grave: L.icon({ iconUrl:'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png', iconSize:[32,32]})
    };

    this.incidentesFiltrados.forEach(i=>{
      const icon = icons[i.severidad as keyof typeof icons];
      L.marker(i.coords, {icon}).addTo(this.map).bindPopup(`<b>${i.tipo}</b><br>${i.ubicacion}<br>${i.fecha}<br><i>${i.estado}</i>`);
    });
  }

  aplicarFiltros(): void {
    this.incidentesFiltrados = this.incidentes.filter(i=>{
      const tipo=this.filtroTipo==='Todos'||i.tipo===this.filtroTipo;
      const severidad=this.filtroSeveridad==='Todos'||i.severidad===this.filtroSeveridad;
      const fecha=!this.filtroFecha||i.fecha>=this.filtroFecha;
      return tipo && severidad && fecha;
    });
    this.configurarGraficas();
    this.actualizarMarcadores();
  }

  limpiarFiltros(): void { this.filtroTipo='Todos'; this.filtroSeveridad='Todos'; this.filtroFecha=''; this.aplicarFiltros(); }

  exportarExcel(): void {
    const datos=this.incidentesFiltrados.map(i=>({Fecha:i.fecha, Ubicación:i.ubicacion, Tipo:i.tipo, Severidad:i.severidad, Estado:i.estado}));
    const hoja=XLSX.utils.json_to_sheet(datos);
    const libro=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja,'Incidentes');
    const buffer=XLSX.write(libro,{bookType:'xlsx',type:'array'});
    const blob=new Blob([buffer],{type:'application/octet-stream'});
    FileSaver.saveAs(blob, `reporte_incidentes_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  async exportarPDFConGraficas() {
    const doc=new jsPDF('p','mm','a4');
    doc.setFontSize(14); doc.text('Reporte de Accidentes / Incidentes',14,20);
    doc.setFontSize(10); doc.text(`Fecha: ${new Date().toLocaleDateString()}`,14,28);
    doc.text(`Tipo: ${this.filtroTipo} | Severidad: ${this.filtroSeveridad} | Desde: ${this.filtroFecha||'---'}`,14,36);

    const donutSvg=document.querySelector('#donutChart svg') as SVGSVGElement;
    const lineSvg=document.querySelector('#lineChart svg') as SVGSVGElement;
    if(donutSvg && lineSvg){
      const donutDataUrl=await this.svgToDataURL(donutSvg);
      const lineDataUrl=await this.svgToDataURL(lineSvg);
      doc.addImage(donutDataUrl,'PNG',14,40,80,60);
      doc.addImage(lineDataUrl,'PNG',110,40,80,60);
    }
    let finalY = (doc as any).lastAutoTable.finalY;
    const data=this.incidentesFiltrados.map(i=>[i.fecha,i.ubicacion,i.tipo,i.severidad,i.estado]);
    autoTable(doc,{startY:110,head:[['Fecha','Ubicación','Tipo','Severidad','Estado']],body:data,styles:{fontSize:8},headStyles:{fillColor:[41,128,185]}});
    doc.text(`Total: ${this.incidentesFiltrados.length}`,14,finalY+10);
    doc.save(`reporte_incidentes_${new Date().toISOString().slice(0,10)}.pdf`);
  }

  private svgToDataURL(svg: SVGSVGElement): Promise<string>{
    return new Promise(resolve=>{
      const svgData=new XMLSerializer().serializeToString(svg);
      const canvas=document.createElement('canvas'); 
      const ctx=canvas.getContext('2d')!;
      const img=new Image();
      const svgBlob=new Blob([svgData],{type:'image/svg+xml;charset=utf-8'});
      const url=URL.createObjectURL(svgBlob);
      img.onload=()=>{
        canvas.width=img.width; canvas.height=img.height; ctx.drawImage(img,0,0); URL.revokeObjectURL(url); resolve(canvas.toDataURL('image/png'));
      }
      img.src=url;
    });
  }
}