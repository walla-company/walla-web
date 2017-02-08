import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
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
        NavbarModule,
        UsersModule,
        PostsModule
    ]
})
export class HomeModule {
}
