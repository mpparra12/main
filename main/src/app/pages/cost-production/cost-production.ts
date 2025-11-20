import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormsModule } from '@angular/forms';

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title?: ApexTitleSubtitle;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title?: ApexTitleSubtitle;
};


@Component({
  selector: 'app-cost-production',
  imports: [NgApexchartsModule, FormsModule],
  templateUrl: './cost-production.html',
  styleUrl: './cost-production.scss'
})
export class CostProduction implements OnInit {
  registros: any[] = [];
  registrosFiltrados: any[] = [];

  filtroArea: string = 'Todos';
  filtroPozo: string = 'Todos';
  filtroProyecto: string = 'Todos';
  filtroFecha: string = '';

  lineChartOptions!: LineChartOptions;
  barChartOptions!: BarChartOptions;

  ngOnInit(): void {
    this.registros = [
      { fecha: '2025-09-01', area: 'Planta Norte', pozo: 'Pozo A-101', proyecto: 'Expansión A', produccion: 1000, capex: 500000, opex: 120000 },
      { fecha: '2025-09-01', area: 'Planta Sur', pozo: 'Pozo B-202', proyecto: 'Mantenimiento B', produccion: 800, capex: 200000, opex: 115000 },
      { fecha: '2025-09-02', area: 'Oleoducto Central', pozo: 'Pozo C-303', proyecto: 'Reparación C', produccion: 900, capex: 150000, opex: 90000 },
      { fecha: '2025-09-03', area: 'Pozo A-101', pozo: 'Pozo A-101', proyecto: 'Perforación D', produccion: 1100, capex: 300000, opex: 310000 }
    ];
    this.registrosFiltrados = [...this.registros];
    this.configurarGraficas();
  }

  aplicarFiltros(): void {
    this.registrosFiltrados = this.registros.filter(r=>{
      const area = this.filtroArea==='Todos'||r.area===this.filtroArea;
      const pozo = this.filtroPozo==='Todos'||r.pozo===this.filtroPozo;
      const proyecto = this.filtroProyecto==='Todos'||r.proyecto===this.filtroProyecto;
      const fecha = !this.filtroFecha || r.fecha >= this.filtroFecha;
      return area && pozo && proyecto && fecha;
    });
    this.configurarGraficas();
  }

  limpiarFiltros(): void {
    this.filtroArea='Todos';
    this.filtroPozo='Todos';
    this.filtroProyecto='Todos';
    this.filtroFecha='';
    this.aplicarFiltros();
  }

  // KPIs
  getProduccionTotal(): number {
    return this.registrosFiltrados.reduce((sum,r)=>sum+r.produccion,0);
  }

  getGastoTotal(): number {
    return this.registrosFiltrados.reduce((sum,r)=>sum+r.capex+r.opex,0);
  }

  getCostoUnitario(): number {
    const totalProd = this.getProduccionTotal();
    return totalProd ? this.getGastoTotal()/totalProd : 0;
  }

  // Gráficas
  configurarGraficas(): void {
    this.lineChartOptions = {
      series:[
        { name:'Producción', data: this.registrosFiltrados.map(r=>r.produccion) },
        { name:'CAPEX', data: this.registrosFiltrados.map(r=>r.capex) },
        { name:'OPEX', data: this.registrosFiltrados.map(r=>r.opex) }
      ],
      chart:{ type:'line', height:250 },
      xaxis:{ categories:this.registrosFiltrados.map(r=>r.fecha) },
      title:{ text:'Evolución Producción vs Costos', align:'center' }
    };

    const areas = Array.from(new Set(this.registrosFiltrados.map(r=>r.pozo)));
    const capexSeries = areas.map(a=>({ name:`${a} CAPEX`, data:[this.registrosFiltrados.filter(r=>r.pozo===a).reduce((sum,r)=>sum+r.capex,0)] }));
    const opexSeries = areas.map(a=>({ name:`${a} OPEX`, data:[this.registrosFiltrados.filter(r=>r.pozo===a).reduce((sum,r)=>sum+r.opex,0)] }));
    const prodSeries = areas.map(a=>({ name:`${a} Producción`, data:[this.registrosFiltrados.filter(r=>r.pozo===a).reduce((sum,r)=>sum+r.produccion,0)] }));

    this.barChartOptions = {
      series:[...capexSeries,...opexSeries,...prodSeries],
      chart:{ type:'bar', stacked:true, height:250 },
      xaxis:{ categories:['Totales'] },
      title:{ text:'Comparativo Costos vs Producción por Pozo', align:'center' }
    };
  }

  // Exportar Excel
  exportarExcel(): void {
    const datos = this.registrosFiltrados.map(r=>({
      Fecha:r.fecha,
      Área:r.area,
      Pozo:r.pozo,
      Proyecto:r.proyecto,
      Producción:r.produccion,
      CAPEX:r.capex,
      OPEX:r.opex,
      CostoUnitario: r.produccion ? (r.capex+r.opex)/r.produccion : 0
    }));
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja,'Costos_Produccion');
    const buffer = XLSX.write(libro,{bookType:'xlsx',type:'array'});
    const blob = new Blob([buffer],{type:'application/octet-stream'});
    FileSaver.saveAs(blob, `cost_prod_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  // Exportar PDF
  exportarPDF(): void {
    const doc = new jsPDF('p','mm','a4');
    doc.setFontSize(14);
    doc.text('Reporte Costos vs Producción',14,20);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`,14,28);
    doc.text(`Área: ${this.filtroArea} | Pozo: ${this.filtroPozo} | Proyecto: ${this.filtroProyecto}`,14,36);

    const data = this.registrosFiltrados.map(r=>[
      r.fecha,r.area,r.pozo,r.proyecto,r.produccion,r.capex,r.opex,(r.capex+r.opex)/r.produccion
    ]);

    autoTable(doc,{
      startY:40,
      head:[['Fecha','Área','Pozo','Proyecto','Producción','CAPEX','OPEX','Costo Unitario']],
      body:data,
      styles:{fontSize:8},
      headStyles:{fillColor:[41,128,185]}
    });

    doc.save(`cost_prod_${new Date().toISOString().slice(0,10)}.pdf`);
  }
}
