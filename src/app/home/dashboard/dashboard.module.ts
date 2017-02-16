import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-chartjs';

import { DashboardComponent } from './dashboard.component';
import { ChartComponent } from '../../directives/index';

@NgModule({
    declarations: [
        DashboardComponent,
        ChartComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        ChartModule
    ]
})
export class DashboardModule {
}
