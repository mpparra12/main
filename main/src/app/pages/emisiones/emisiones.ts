import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ChartComponent, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexNonAxisChartSeries, ApexLegend, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  selector: 'app-emisiones',
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './emisiones.html',
  styleUrl: './emisiones.scss'
})
export class Emisiones implements OnInit, AfterViewInit {
  private map!: L.Map;

  donutChartOptions!: DonutChartOptions;
  lineChartOptions!: LineChartOptions;
  stackedBarChartOptions!: StackedBarChartOptions;

  registros: any[] = [];
  registrosFiltrados: any[] = [];

  filtroArea: string = 'Todos';
  filtroTipo: string = 'Todos';
  filtroFuente: string = 'Todos';
  filtroFecha: string = '';

  ngOnInit(): void {
    this.registros = [
      { fecha: '2025-09-01', area: 'Planta Norte', tipo: 'CO₂', fuente: 'Combustión', toneladas: 120, coords: [5.35, -73.23] },
      { fecha: '2025-09-01', area: 'Planta Sur', tipo: 'CH₄', fuente: 'Flaring', toneladas: 45, coords: [5.36, -73.24] },
      { fecha: '2025-09-01', area: 'Pozo A-101', tipo: 'CO₂', fuente: 'Transporte', toneladas: 30, coords: [5.34, -73.22] },
      { fecha: '2025-09-02', area: 'Oleoducto Central', tipo: 'N₂O', fuente: 'Procesos', toneladas: 20, coords: [5.33, -73.21] }
    ];
    this.registrosFiltrados = [...this.registros];
    this.configurarGraficas();
  }

  ngAfterViewInit(): void { this.initMap(); }

  private initMap(): void {
    this.map = L.map('mapaEmisiones', { center: [5.34, -73.23], zoom: 12 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(this.map);
    this.actualizarMarcadores();
  }

  private actualizarMarcadores(): void {
    if (!this.map) return;
    (this.map as any)._layers && Object.values((this.map as any)._layers).forEach((layer: any) => { if(layer instanceof L.Marker) this.map.removeLayer(layer); });
    const icon = L.icon({ iconUrl:'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png', iconSize:[32,32] });
    this.registrosFiltrados.forEach(r=>{
      L.marker(r.coords,{icon}).addTo(this.map).bindPopup(`<b>${r.tipo}</b><br>${r.area}<br>${r.fuente}<br>${r.toneladas} tCO₂e<br>${r.fecha}`);
    });
  }

  aplicarFiltros(): void {
    this.registrosFiltrados = this.registros.filter(r=>{
      const area = this.filtroArea==='Todos'||r.area===this.filtroArea;
      const tipo = this.filtroTipo==='Todos'||r.tipo===this.filtroTipo;
      const fuente = this.filtroFuente==='Todos'||r.fuente===this.filtroFuente;
      const fecha = !this.filtroFecha || r.fecha >= this.filtroFecha;
      return area && tipo && fuente && fecha;
    });
    this.configurarGraficas();
    this.actualizarMarcadores();
  }

  limpiarFiltros(): void {
    this.filtroArea='Todos'; this.filtroTipo='Todos'; this.filtroFuente='Todos'; this.filtroFecha=''; this.aplicarFiltros();
  }
// Total emisiones
getTotalEmisiones(): number {
  return this.registrosFiltrados.reduce((sum, r) => sum + r.toneladas, 0);
}

// Por tipo
getTotalCO2(): number {
  return this.registrosFiltrados
             .filter(r => r.tipo === 'CO₂')
             .reduce((sum, r) => sum + r.toneladas, 0);
}

getTotalCH4(): number {
  return this.registrosFiltrados
             .filter(r => r.tipo === 'CH₄')
             .reduce((sum, r) => sum + r.toneladas, 0);
}

getTotalN2O(): number {
  return this.registrosFiltrados
             .filter(r => r.tipo === 'N₂O')
             .reduce((sum, r) => sum + r.toneladas, 0);
}
  configurarGraficas(): void {
    // Donut: Distribución por tipo
    const tipos = ['CO₂','CH₄','N₂O'];
    const conteoPorTipo = tipos.map(t => this.registrosFiltrados.filter(r => r.tipo===t).reduce((sum,r)=>sum+r.toneladas,0));
    this.donutChartOptions = { series: conteoPorTipo, chart: { type:'donut', height:250 }, labels: tipos, legend:{position:'bottom'}, title:{text:'Emisiones por tipo', align:'center'} };

    // Línea: Evolución mensual (mock)
    this.lineChartOptions = { series:[{name:'Emisiones tCO₂e', data:[150,200,180,220,190,210,200,230,180,210,190,220]}],
      chart:{type:'line',height:250}, xaxis:{categories:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']},
      title:{text:'Evolución mensual', align:'center'}};

    // Barra apilada: Por fuente
    const fuentes = ['Combustión','Flaring','Transporte','Procesos'];
    const series = fuentes.map(f=>({name:f, data:this.registrosFiltrados.filter(r=>r.fuente===f).map(r=>r.toneladas)}));
    const categorias = this.registrosFiltrados.map(r=>r.area);
    this.stackedBarChartOptions = { series, chart:{type:'bar', stacked:true,height:250}, xaxis:{}, title:{text:'Emisiones por fuente y área', align:'center'} };
  }

  exportarExcel(): void {
    const datos = this.registrosFiltrados.map(r=>({Fecha:r.fecha, Área:r.area, Tipo:r.tipo, Fuente:r.fuente, Toneladas:r.toneladas}));
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja,'Emisiones');
    const buffer = XLSX.write(libro,{bookType:'xlsx',type:'array'});
    const blob = new Blob([buffer],{type:'application/octet-stream'});
    FileSaver.saveAs(blob, `emisiones_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  async exportarPDFConGraficas() {
    const doc = new jsPDF('p','mm','a4');
    doc.setFontSize(14); doc.text('Reporte de Emisiones / Huella de Carbono',14,20);
    doc.setFontSize(10); doc.text(`Fecha: ${new Date().toLocaleDateString()}`,14,28);
    doc.text(`Área: ${this.filtroArea} | Tipo: ${this.filtroTipo} | Fuente: ${this.filtroFuente} | Desde: ${this.filtroFecha||'---'}`,14,36);

    const donutSvg = document.querySelector('#donutChart svg') as SVGSVGElement;
    const lineSvg = document.querySelector('#lineChart svg') as SVGSVGElement;
    const barSvg = document.querySelector('#stackedBarChart svg') as SVGSVGElement;

    const svgs = [donutSvg,lineSvg,barSvg].filter(s=>s) as SVGSVGElement[];
    for(let i=0;i<svgs.length;i++){
      const imgData = await this.svgToDataURL(svgs[i]);
      doc.addImage(imgData,'PNG',14 + (i%2)*96, 40 + Math.floor(i/2)*70, 80,60);
    }
let finalY = (doc as any).lastAutoTable.finalY;
    const data = this.registrosFiltrados.map(r=>[r.fecha,r.area,r.tipo,r.fuente,r.toneladas]);
    autoTable(doc,{startY:110, head:[['Fecha','Área','Tipo','Fuente','Toneladas']], body:data, styles:{fontSize:8}, headStyles:{fillColor:[41,128,185]}});
    doc.text(`Total registros: ${this.registrosFiltrados.length}`,14,finalY+10);
    doc.save(`emisiones_${new Date().toISOString().slice(0,10)}.pdf`);
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