import { NgModule } from '@angular/core';
import { LoginComponent } from './index';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AlertComponent } from '../directives/index';

@NgModule({
    declarations: [
        LoginComponent,
        AlertComponent
    ],
    exports: [
        LoginComponent
    ],
    imports: [
        FormsModule,
        BrowserModule
    ]
})
export class LoginModule {
}
