import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { AuthService, UserService, AlertService, DomainService } from './services/index';
import { AuthGuard } from './guards/auth.guard';
// fake-backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HomeModule,
        LoginModule,
        HttpModule,
        routing
    ],
    bootstrap: [ AppComponent ],
    providers: [
        AuthService,
        UserService,
        AlertService,
        DomainService,
        // fakeBackendProvider,
        // MockBackend,
        // BaseRequestOptions,
        AuthGuard
    ]
})
export class AppModule {
}
