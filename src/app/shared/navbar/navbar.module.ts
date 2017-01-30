import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../../services/index';

import { NavbarComponent } from './index';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        RouterModule,
        BrowserModule
    ],
    exports: [
        NavbarComponent
    ],
    providers: [
        AuthService
    ]
})
export class NavbarModule {
}
