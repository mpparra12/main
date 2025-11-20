import { Routes } from '@angular/router';


// pages
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';
import { ListProject } from '../project/list-project/list-project';
import { MapaComponent } from '../mapa.component/mapa.component';
import { WellComponent } from '../well.component/well.component';
import { DailyProduction } from '../daily-production/daily-production';
import { HistoryProduction } from '../history-production/history-production';
import { Drilling } from '../drilling/drilling';
import { Cost } from '../cost/cost';
import { Reservoirs } from '../reservoirs/reservoirs';
import { Ductos } from '../ductos/ductos';
import { Logistic } from '../logistic/logistic';
import { Fugas } from '../fugas/fugas';
import { Plants } from '../plants/plants';
import { Products } from '../products/products';
import { Quality } from '../quality/quality';
import { Incidents } from '../incidents/incidents';
import { SecurityReport } from '../security-report/security-report';
import { Emisiones } from '../emisiones/emisiones';
import { CostProduction } from '../cost-production/cost-production';
import { Forecast } from '../forecast/forecast';
import { Reports } from '../reports/reports';
import { DashboardPageComponent } from '../containers/dashboard-page.component/dashboard-page.component';
import { WellDashboard } from '../well-dashboard/well-dashboard';
import { ImportWells } from '../import/import-wells/import-wells';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'icons',
        component: AppIconsComponent,
      },
      {
        path: 'sample-page',
        component: AppSamplePageComponent,
      },
      {
        path: 'ListProject',
        component: ListProject,
  },
        {
        path: 'Mapa',
        component: MapaComponent,
  },
          {
        path: 'Wells',
        component: WellComponent,
  },
            {
        path: 'DailyProduction',
        component: DailyProduction,
  },
            {
        path: 'History',
        component: HistoryProduction,
  },
              {
        path: 'Drilling',
        component: Drilling,
  },
              {
        path: 'Cost',
        component: Cost,
  },
                {
        path: 'Reservoirs',
        component: Reservoirs,
  },
                  {
        path: 'Ductos',
        component: Ductos,
  },  
                    {
        path: 'Logistic',
        component: Logistic,
  }, 
                    {
        path: 'Fugas',
        component: Fugas,
  },   
                    {
        path: 'Plants',
        component: Plants,
  },
                      {
        path: 'Products',
        component: Products,
  },
                        {
        path: 'Quality',
        component: Quality,
  },
  {
        path: 'Incidents',
        component: Incidents,
  }
  ,
  {
        path: 'SecurityReport',
        component: SecurityReport,
  },
   {
        path: 'Emisiones',
        component: Emisiones,
  },
  {
        path: 'CostProduction',
        component: CostProduction,
  },
    {
        path: 'Forecast',
        component: Forecast,
  },
      {
        path: 'Reports',
        component: Reports,
  },
    
      {
        path: 'DashboardPageComponent',
        component: DashboardPageComponent,
  },
  {
        path: 'ImportWells',
        component: ImportWells,

  },
       {
        path: 'WellDashboard',
        component: WellDashboard,
  }
  
  
  
  
     
    ],
  },
];
