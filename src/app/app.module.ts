import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';
import { TabsModule } from 'ng2-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { UsersComponent } from './home/users/users.component';
import { PostsComponent } from './home/posts/posts.component';
import { ActivitiesComponent } from './home/activities/activities.component';
import { AlertComponent } from './shared/alert/alert.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ChartComponent } from './shared/chart/chart.component';
import { EnterKeypressDirective } from './directives/enter-keypress.directive';
import { WordCloudComponent } from './shared/word-cloud/word-cloud.component';
import { SecondToDatePipe } from './pipes/second-to-date.pipe';
import { AuthService, UserService, ActivityService, AlertService, DomainService, DashboardService, GroupService } from './services/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    UsersComponent,
    ActivitiesComponent,
    PostsComponent,
    AlertComponent,
    NavbarComponent,
    ChartComponent,
    EnterKeypressDirective,
    WordCloudComponent,
    SecondToDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    TabsModule.forRoot(),
    DataTableModule,
    ChartModule,
    routing
  ],
  providers: [
      AuthService,
      UserService,
      ActivityService,
      AlertService,
      DomainService,
      DashboardService,
      GroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
