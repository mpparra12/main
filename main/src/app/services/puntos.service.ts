import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Punto {
  id: number;
  nombre: string;
  lat: number;
  lng: number;
  origen: 'local' | 'esri' | 'api';
}

@Injectable({ providedIn: 'root' })
export class PuntosService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // 👈 tu API

  constructor(private http: HttpClient) {}

  // 1. Puntos locales
  getPuntosLocales(): Observable<Punto[]> {
    return of([
      { id: 1, nombre: 'Local A', lat: 40.7128, lng: -74.0060, origen: 'local' },
      { id: 2, nombre: 'Local B', lat: 34.0522, lng: -118.2437, origen: 'local' },
      { id: 3, nombre: 'Local C', lat: 41.8781, lng: -87.6298, origen: 'local' }
    ]);
  }

  // 2. Puntos desde Esri
  getPuntosFromEsri(): Observable<Punto[]> {
    return new Observable<Punto[]>(observer => {
      const url = 'https://maps.cityofrochester.gov/server/rest/services/Open_Data/Trees_Open_Data/FeatureServer/0'; // 👈 cámbialo
            const featureLayer = (window as any).L.esri.featureLayer({ url });

      const puntos: Punto[] = [];

      featureLayer.query().run((error: any, featureCollection: any) => {
        if (error) {
          observer.error(error);
        } else {
          featureCollection.features.forEach((f: any, idx: number) => {
            const coords = f.geometry.coordinates;
            const atributos = f.properties;
            puntos.push({
              id: atributos.OBJECTID || idx,
              nombre: atributos.Nombre || 'Sin nombre',
              lat: coords[1],
              lng: coords[0],
              origen: 'esri'
            });
          });
          observer.next(puntos);
          observer.complete();
        }
      });
    });
  }

  // 3. Puntos desde tu API REST
  getPuntosFromApi(): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.apiUrl);
    /*
    🔹 La API debería responder algo como:
    [
      { "id": 101, "nombre": "API A", "lat": 25.76, "lng": -80.19, "origen": "api" },
      { "id": 102, "nombre": "API B", "lat": 29.76, "lng": -95.36, "origen": "api" }
    ]
    */
  }
}