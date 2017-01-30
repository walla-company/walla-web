import { NgModule } from '@angular/core';
import { HomeComponent } from './index';
import { UsersModule } from './users/index';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../shared';

@NgModule({
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent,
        UsersModule,
        RouterModule,
        BrowserModule
    ],
    imports: [
        BrowserModule,
        RouterModule,
        NavbarModule
    ]
})
export class HomeModule {
}
