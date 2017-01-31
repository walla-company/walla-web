import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

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
        BrowserModule,
        RouterModule
    ]
})
export class UsersModule {
}
