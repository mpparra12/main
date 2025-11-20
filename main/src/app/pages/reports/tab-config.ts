// tabs.config.ts
export interface TabConfig {
  id: string;
  title: string;
  dataType: string;
}

export const TABS_CONFIG: TabConfig[] = [
  { id: 'pozos', title: 'Pozos', dataType: 'produccion' },
  { id: 'perforacion', title: 'Perforación', dataType: 'avance' },
  { id: 'reservorios', title: 'Reservorios', dataType: 'presion' },
  { id: 'capex_opex', title: 'CAPEX / OPEX', dataType: 'costo' },
  { id: 'forecast', title: 'Forecast', dataType: 'proyeccion' },
  { id: 'seguridad', title: 'Seguridad', dataType: 'accidentes' },
];
