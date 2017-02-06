import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { ChartModule } from 'angular2-chartjs';

import { UsersComponent } from './users.component';
import { UsersFormComponent } from './users-form.component';

@NgModule({
    declarations: [
        UsersComponent,
        UsersFormComponent
    ],
    exports: [
        UsersComponent,
        UsersFormComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule,
        DataTableModule,
        ChartModule
    ]
})
export class UsersModule {
}
