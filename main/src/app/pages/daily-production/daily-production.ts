import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { AppSalesProfitComponent } from 'src/app/components/sales-profit/sales-profit.component';
import { AppTotalFollowersComponent } from 'src/app/components/total-followers/total-followers.component';
import { AppTotalIncomeComponent } from 'src/app/components/total-income/total-income.component';
import { AppPopularProductsComponent } from 'src/app/components/popular-products/popular-products.component';
import { AppEarningReportsComponent } from 'src/app/components/earning-reports/earning-reports.component';
import { DailyProductionComp } from "src/app/components/daily-production-comp/daily-production-comp";
import { DailyOilGas } from "src/app/components/daily-oil-gas/daily-oil-gas";
import { HSETracker } from "src/app/components/hse-tracker/hse-tracker";

import { RevenueChartComponent } from "src/app/components/revenue-chart/revenue-chart.component";
import { DashboardService } from 'src/app/services/dashboard.service';
import { DailyLineChartComponent } from "src/app/components/daily-line-chart/daily-line-chart.component";
import { PerformanceChartComponent } from "src/app/components/performance-chart/performance-chart.component";
import { ProjectStatChartComponent } from "src/app/components/project-stat-chart/project-stat-chart.component";
import { ServerChartComponent } from "src/app/components/server-chart/server-chart.component";

@Component({
  selector: 'app-daily-production',
  imports: [AppEarningReportsComponent, DailyProductionComp, DailyOilGas, AppSalesProfitComponent, RevenueChartComponent, HSETracker, AppTotalFollowersComponent, AppTotalIncomeComponent, AppBlogCardsComponent, DailyLineChartComponent, PerformanceChartComponent, AppPopularProductsComponent, ProjectStatChartComponent, ServerChartComponent],
  templateUrl: './daily-production.html',
    providers: [
    DashboardService
  ],
  styleUrl: './daily-production.scss'
})
export class DailyProduction {

}
