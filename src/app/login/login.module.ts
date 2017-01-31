import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
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
