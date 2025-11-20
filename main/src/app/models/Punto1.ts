interface Punto1 {
  id: number;
  name: string;
  username: string;
   email: string;
   address: string;
  lat: number;
  lng: number;
  origen: 'local' | 'esri';   // 👈 nuevo campo para distinguir
  marker?: L.CircleMarker;
}