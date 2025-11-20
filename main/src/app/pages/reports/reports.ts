import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TabGeneric } from './tab-generic/tab-generic/tab-generic';
import { TABS_CONFIG } from './tab-config';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TabGeneric],
  templateUrl: './reports.html',
  styleUrl: './reports.scss'
})
export class Reports {
  tabs = TABS_CONFIG;
}
