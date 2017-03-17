import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { UsersRoutes } from './users/users.routing';
import { PostsRoutes } from './posts/posts.routing';
import { DashboardRoutes } from './dashboard/dashboard.routing';

export const HomeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      ...UsersRoutes,
      ...PostsRoutes,
      ...DashboardRoutes,
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];
