import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { UsersRoutes } from './users/users.routing';
import { ActivitiesRoutes } from './activities/activities.routing';
import { DashboardRoutes } from './dashboard/dashboard.routing';

export const HomeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      ...UsersRoutes,
      ...ActivitiesRoutes,
      ...DashboardRoutes,
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];
