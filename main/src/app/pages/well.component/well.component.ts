import { Component, AfterViewInit, ViewChild, viewChild, afterEveryRender, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import * as EL from 'esri-leaflet';
import { PuntosService } from 'src/app/services/puntos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from "src/app/material.module";
import { FormsModule } from  '@angular/forms' ; // Importar FormsModule 
import 'esri-leaflet';
import { TitleCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AppTotalFollowersComponent } from 'src/app/components/total-followers/total-followers.component';
import { DailyProductionComp } from 'src/app/components/daily-production-comp/daily-production-comp';


import { AppTotalIncomeComponent } from "src/app/components/total-income/total-income.component";
import { AppSalesProfitComponent } from "src/app/components/sales-profit/sales-profit.component";

interface Punto {
  id: number;
  nombre: string;
  lat: number;
  lng: number;
  origen: string; // local, servicio, api
}



@Component({
  standalone: true,
  selector: 'app-well.component',
  imports: [MaterialModule, FormsModule, CommonModule, AppTotalFollowersComponent, AppTotalIncomeComponent, DailyProductionComp],
  templateUrl: './well.component.html',
  styleUrl: './well.component.scss',
   encapsulation: ViewEncapsulation.None,
})
export class WellComponent implements  AfterViewInit {
  map!: L.Map;
  puntos: Punto[] = [];
  dataSource = new MatTableDataSource<Punto>([]);
  displayedColumns: string[] = ['id', 'nombre', 'origen'];
  capas: { [key: string]: L.LayerGroup } = {};
  markersMap = new Map<number, L.CircleMarker>();

  colores: { [key: string]: string } = {
    local: 'red',
    servicio: 'blue',
    api: 'green'
  };

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [40, -100],
      zoom: 4
    });

    // BaseMap
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

    // Capa base y overlays para control de Leaflet
    const baseMaps = { 'OpenStreetMap': osm };

    // Crear capas
    this.capas['local'] = L.layerGroup();
    this.capas['servicio'] = L.layerGroup();
    this.capas['api'] = L.layerGroup();

    // Overlay maps
    const overlayMaps: any = {
      'Local': this.capas['local'],
      'Servicio': this.capas['servicio'],
      'API': this.capas['api']
    };

    // ✅ Control de capas Leaflet
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(this.map);

    // Cargar datos
    this.cargarDatosLocales();
    this.cargarServicioEsri();
    this.cargarDesdeApi();

    // Inicializamos tabla
    this.actualizarTabla();
  }

  cargarDatosLocales() {
    const datos: Punto[] = [
      { id: 1, nombre: 'Punto A', lat: 40, lng: -100, origen: 'local' },
      { id: 2, nombre: 'Punto B', lat: 41, lng: -101, origen: 'local' }
    ];
    datos.forEach(p => this.agregarPunto(p));
  }

  cargarServicioEsri() {
    const esriLayer = EL.featureLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0'
    });

    esriLayer.query().where("MAGNITUDE > 5").run((error, featureCollection) => {
      if (featureCollection) {
        featureCollection.features.slice(0, 5).forEach((f: any, idx: number) => {
          const p: Punto = {
            id: 100 + idx,
            nombre: f.properties.NAME || `Sismo ${idx + 1}`,
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0],
            origen: 'servicio'
          };
          this.agregarPunto(p);
        });
      }
    });
  }

  cargarDesdeApi() {
    const datosApi: Punto[] = [
      { id: 200, nombre: 'API 1', lat: 39, lng: -102, origen: 'api' },
      { id: 201, nombre: 'API 2', lat: 38, lng: -99, origen: 'api' }
    ];
    datosApi.forEach(p => this.agregarPunto(p));
  }

  agregarPunto(p: Punto) {
    this.puntos.push(p);

    const marker = L.circleMarker([p.lat, p.lng], {
      radius: 6,
      color: this.colores[p.origen]
    }).bindPopup(`<b>${p.nombre}</b><br/>Origen: ${p.origen}`);

    marker.on('click', () => this.seleccionarFila(p));

    this.markersMap.set(p.id, marker);
    this.capas[p.origen].addLayer(marker);
  }

  seleccionarFila(p: Punto) {
    this.dataSource.data = [p]; // muestra solo el seleccionado
    const marker = this.markersMap.get(p.id);
    if (marker) {
      this.map.setView(marker.getLatLng(), 8);
      marker.openPopup();
    }
  }

  seleccionarPuntoDesdeTabla(row: Punto) {
    const marker = this.markersMap.get(row.id);
    if (marker) {
      this.map.setView(marker.getLatLng(), 8);
      marker.openPopup();
    }
  }

  actualizarTabla() {
    const activos: Punto[] = [];
    Object.keys(this.capas).forEach(origen => {
      if (this.map.hasLayer(this.capas[origen])) {
        activos.push(...this.puntos.filter(p => p.origen === origen));
      }
    });
    this.dataSource.data = activos;
  }

  get capasActivas(): string[] {
    return Object.keys(this.capas).filter(origen =>
      this.map.hasLayer(this.capas[origen])
    );
  }

  get resumenTabla(): string {
    const totalVisibles = this.dataSource.data.length;
    const activas = this.capasActivas.length;
    const totalCargados = this.puntos.length;
    return `Mostrando ${totalVisibles} puntos de ${activas} capa${activas !== 1 ? 's' : ''} activas (total ${totalCargados} puntos cargados)`;
  }

  get conteoPorCapa() {
    return Object.keys(this.capas).map(origen => {
      const total = this.puntos.filter(p => p.origen === origen).length;
      const activos = this.dataSource.data.filter(p => p.origen === origen).length;
      return { origen, total, activos, color: this.colores[origen] };
    });
  }

  toggleCapa(origen: string) {
    const capa = this.capas[origen];
    if (this.map.hasLayer(capa)) {
      this.map.removeLayer(capa);
    } else {
      this.map.addLayer(capa);
      this.zoomCapa(origen);
    }
    this.actualizarTabla();
  }

  zoomCapa(origen: string) {
    const capa = this.capas[origen];
    const bounds = (capa as any).getBounds?.();
    if (bounds && bounds.isValid()) {
      this.map.fitBounds(bounds, { padding: [20, 20] });
    }
  }

  activarTodasCapas() {
    Object.keys(this.capas).forEach(origen => {
      const capa = this.capas[origen];
      if (!this.map.hasLayer(capa)) {
        this.map.addLayer(capa);
      }
    });
    this.actualizarTabla();
    this.zoomTodasCapas();
  }

  desactivarTodasCapas() {
    Object.keys(this.capas).forEach(origen => {
      const capa = this.capas[origen];
      if (this.map.hasLayer(capa)) {
        this.map.removeLayer(capa);
      }
    });
    this.actualizarTabla();
  }

  zoomTodasCapas() {
    const allMarkers: L.LatLng[] = [];
    Object.keys(this.capas).forEach(origen => {
      if (this.map.hasLayer(this.capas[origen])) {
        (this.capas[origen] as any).getLayers().forEach((m: L.CircleMarker) => {
          allMarkers.push(m.getLatLng());
        });
      }
    });

    if (allMarkers.length) {
      const bounds = L.latLngBounds(allMarkers);
      this.map.fitBounds(bounds, { padding: [20, 20] });
    }
  }
}