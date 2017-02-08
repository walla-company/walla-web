import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { ChartModule } from 'angular2-chartjs';

import { PostsComponent } from './posts.component';
import { SecondToDatePipe } from '../../filters/index';
// import { UsersFormComponent } from './posts-form.component';

@NgModule({
    declarations: [
        PostsComponent,
        SecondToDatePipe,
        // UsersFormComponent
    ],
    exports: [
        PostsComponent,
        // UsersFormComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule,
        DataTableModule,
        ChartModule
    ]
})
export class PostsModule {
}
