// src/app/forecast/forecast.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

export interface HistoricalPoint {
  date: string; // 'YYYY-MM-DD'
  value: number;
}

@Injectable({ providedIn: 'root' })
export class ForecastService {
  // Ajusta esta URL a tu backend real
  private apiBase = '/api';

  constructor(private http: HttpClient) {}

  // Obtener lista de pozos (espera: string[] de ids o nombres)
  getWells() {
    return this.http.get<string[]>(`${this.apiBase}/wells`).pipe(
      catchError(() => {
        // fallback mock
        return of(['Pozo A-101', 'Pozo B-202', 'Pozo C-303']);
      })
    );
  }

  // Obtener histórico de un pozo: devuelve HistoricalPoint[]
  getHistorical(wellId: string) {
    return this.http.get<HistoricalPoint[]>(`${this.apiBase}/historical/${encodeURIComponent(wellId)}`).pipe(
      catchError(() => {
        // fallback mock: 18 meses con tendencia y ruido
        const arr: HistoricalPoint[] = [];
        const start = new Date(2024, 3, 1); // abril 2024
        for (let i = 0; i < 18; i++) {
          const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
          const val = 1000 + i * 30 + (Math.random() * 80 - 40);
          arr.push({ date: d.toISOString().slice(0, 10), value: Number(val.toFixed(2)) });
        }
        return of(arr);
      }),
      map(data => data.sort((a, b) => a.date.localeCompare(b.date)))
    );
  }
}
