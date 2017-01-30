import { NgModule } from '@angular/core';
import { UsersComponent } from './index';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        UsersComponent
    ],
    exports: [
        UsersComponent
    ],
    imports: [
        BrowserModule
    ]
})
export class UsersModule {
}
