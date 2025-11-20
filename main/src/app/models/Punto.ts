interface Punto {
  id: number;
  nombre: string;
  lat: number;
  lng: number;
  origen: 'local' | 'esri';   // 👈 nuevo campo para distinguir
  marker?: L.CircleMarker;
}