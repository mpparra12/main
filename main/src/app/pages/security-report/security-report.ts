import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ChartComponent, ApexChart, ApexNonAxisChartSeries, ApexLegend, ApexTitleSubtitle, ApexAxisChartSeries, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

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
  selector: 'app-security-report',
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './security-report.html',
  styleUrl: './security-report.scss'
})
export class SecurityReport implements OnInit, AfterViewInit {

  donutChartOptions!: DonutChartOptions;
  lineChartOptions!: LineChartOptions;
  private map!: L.Map;

  incidentes: any[] = [];
  incidentesFiltrados: any[] = [];

  filtroTipo: string = 'Todos';
  filtroSeveridad: string = 'Todos';
  filtroArea: string = 'Todos';
  filtroFecha: string = '';

  ngOnInit(): void {
    this.incidentes = [
      { fecha: '2025-10-01', area: 'Planta Norte', tipo: 'Fuga de Gas', severidad: 'Grave', estado: 'Abierto', coords: [5.35, -73.23] },
      { fecha: '2025-10-02', area: 'Oleoducto Central', tipo: 'Incendio', severidad: 'Moderado', estado: 'Cerrado', coords: [5.34, -73.22] },
      { fecha: '2025-10-03', area: 'Pozo A-101', tipo: 'Lesión', severidad: 'Leve', estado: 'Cerrado', coords: [5.36, -73.24] },
      { fecha: '2025-10-05', area: 'Terminal Marítimo', tipo: 'Derrame', severidad: 'Moderado', estado: 'En investigación', coords: [5.33, -73.21] }
    ];
    this.incidentesFiltrados = [...this.incidentes];
    this.configurarGraficas();
  }

  ngAfterViewInit(): void { this.initMap(); }

  configurarGraficas(): void {
    const tipos = ['Lesión','Fuga de Gas','Incendio','Derrame'];
    const conteoPorTipo = tipos.map(t => this.incidentesFiltrados.filter(i => i.tipo===t).length);

    this.donutChartOptions = {
      series: conteoPorTipo,
      chart: { type:'donut', height:250 },
      labels: tipos,
      legend: { position:'bottom' },
      title: { text:'Distribución por tipo', align:'center' }
    };

    this.lineChartOptions = {
      series: [{ name:'Incidentes', data: [3,5,4,6,2,3,4,5,6,3,2,1] }],
      chart: { type:'line', height:250 },
      xaxis: { categories:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'] },
      title: { text:'Evolución mensual', align:'center' }
    };
  }

  private initMap(): void {
    this.map = L.map('mapaSeguridad',{center:[5.34,-73.23],zoom:12});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'© OpenStreetMap contributors' }).addTo(this.map);
    this.actualizarMarcadores();
  }

  private actualizarMarcadores(): void {
    if(!this.map) return;
    (this.map as any)._layers && Object.values((this.map as any)._layers).forEach((layer:any)=>{ if(layer instanceof L.Marker) this.map.removeLayer(layer); });
    const icons = {
      Leve:L.icon({iconUrl:'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png',iconSize:[32,32]}),
      Moderado:L.icon({iconUrl:'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',iconSize:[32,32]}),
      Grave:L.icon({iconUrl:'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',iconSize:[32,32]})
    };
    this.incidentesFiltrados.forEach(i=>{
      const icon = icons[i.severidad as keyof typeof icons];
      L.marker(i.coords,{icon}).addTo(this.map).bindPopup(`<b>${i.tipo}</b><br>${i.area}<br>${i.fecha}<br><i>${i.estado}</i>`);
    });
  }

  aplicarFiltros(): void {
    this.incidentesFiltrados=this.incidentes.filter(i=>{
      const tipo = this.filtroTipo==='Todos'||i.tipo===this.filtroTipo;
      const severidad = this.filtroSeveridad==='Todos'||i.severidad===this.filtroSeveridad;
      const area = this.filtroArea==='Todos'||i.area===this.filtroArea;
      const fecha = !this.filtroFecha || i.fecha>=this.filtroFecha;
      return tipo && severidad && area && fecha;
    });
    this.configurarGraficas();
    this.actualizarMarcadores();
  }

  limpiarFiltros(): void { this.filtroTipo='Todos'; this.filtroSeveridad='Todos'; this.filtroArea='Todos'; this.filtroFecha=''; this.aplicarFiltros(); }

  exportarExcel(): void {
    const datos = this.incidentesFiltrados.map(i=>({Fecha:i.fecha, Área:i.area, Tipo:i.tipo, Severidad:i.severidad, Estado:i.estado}));
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja,'Seguridad');
    const buffer = XLSX.write(libro,{bookType:'xlsx',type:'array'});
    const blob = new Blob([buffer],{type:'application/octet-stream'});
    FileSaver.saveAs(blob, `reporte_seguridad_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  async exportarPDFConGraficas() {
    const doc = new jsPDF('p','mm','a4');
    doc.setFontSize(14); doc.text('Reporte de Seguridad',14,20);
    doc.setFontSize(10); doc.text(`Fecha: ${new Date().toLocaleDateString()}`,14,28);
    doc.text(`Tipo: ${this.filtroTipo} | Severidad: ${this.filtroSeveridad} | Área: ${this.filtroArea} | Desde: ${this.filtroFecha||'---'}`,14,36);

    const donutSvg = document.querySelector('#donutChart svg') as SVGSVGElement;
    const lineSvg = document.querySelector('#lineChart svg') as SVGSVGElement;
    if(donutSvg && lineSvg){
      const donutDataUrl = await this.svgToDataURL(donutSvg);
      const lineDataUrl = await this.svgToDataURL(lineSvg);
      doc.addImage(donutDataUrl,'PNG',14,40,80,60);
      doc.addImage(lineDataUrl,'PNG',110,40,80,60);
    }
let finalY = (doc as any).lastAutoTable.finalY;
    const data = this.incidentesFiltrados.map(i=>[i.fecha,i.area,i.tipo,i.severidad,i.estado]);
    autoTable(doc,{startY:110, head:[['Fecha','Área','Tipo','Severidad','Estado']], body:data, styles:{fontSize:8}, headStyles:{fillColor:[41,128,185]}});
    doc.text(`Total: ${this.incidentesFiltrados.length}`,14,finalY+10);
    doc.save(`reporte_seguridad_${new Date().toISOString().slice(0,10)}.pdf`);
  }

  private svgToDataURL(svg: SVGSVGElement): Promise<string> {
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
