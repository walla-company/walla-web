import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { UsersRoutes } from './users/users.routing';
import { ActivitiesRoutes } from './activities/activities.routing';
import { DashboardRoutes } from './dashboard/dashboard.routing';
import { AuthGuard } from '../guards/auth.guard';

export const HomeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    children: [
      ...UsersRoutes,
      ...ActivitiesRoutes,
      ...DashboardRoutes,
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];
