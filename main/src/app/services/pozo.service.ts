import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Pozo {
  id: string;
  nombre: string;
  campo: string;
  lat: number;
  lon: number;
  estado: 'Produciendo' | 'Perforación' | 'Mantenimiento' | 'Cerrado';
  presionPsi: number;
  corteAguaPct: number;
  produccionDiariaBbl: number;
}

@Injectable({ providedIn: 'root' })
export class PozoService {
  getPozo(): Observable<Pozo> {
    const p: Pozo = {
      id: '1234',
      nombre: 'Pozo #1234',
      campo: 'Campo Norte',
      lat: 29.756, 
      lon: -95.362,
      estado: 'Produciendo',
      presionPsi: 2350,
      corteAguaPct: 12,
      produccionDiariaBbl: 1500
    };
    return of(p);
  }

  getProduccionDiaria(): Observable<{day: string, oil: number, gas: number}[]> {
    return of([
      { day: 'Lun', oil: 1200, gas: 300 },
      { day: 'Mar', oil: 1100, gas: 280 },
      { day: 'Mié', oil: 1400, gas: 350 },
      { day: 'Jue', oil: 1300, gas: 320 },
      { day: 'Vie', oil: 1500, gas: 400 }
    ]);
  }

  getHistoricoMensual(): Observable<{month: string, total: number}[]> {
    return of([
      { month: 'Ene', total: 32000 },
      { month: 'Feb', total: 28000 },
      { month: 'Mar', total: 35000 },
      { month: 'Abr', total: 37000 },
      { month: 'May', total: 40000 }
    ]);
  }
}