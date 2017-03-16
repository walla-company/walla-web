import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { DashboardComponent } from './dashboard.component';
import { ChartComponent, WordCloudComponent, TabFadeTransictionDirective } from '../../directives/index';

@NgModule({
    declarations: [
        DashboardComponent,
        ChartComponent,
        WordCloudComponent,
        TabFadeTransictionDirective
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        ChartModule,
        TabsModule.forRoot(),
        MyDatePickerModule,
        MyDateRangePickerModule
    ]
})
export class DashboardModule {
}
