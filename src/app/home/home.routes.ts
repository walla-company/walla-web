import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsersRoutes } from './users/users.routes';
import { PostsRoutes } from './posts/posts.routes';
import { DashboardRoutes } from './dashboard/dashboard.routes';

export const HomeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [ AuthGuard ],
    children: [
      ...UsersRoutes,
      ...PostsRoutes,
      ...DashboardRoutes,
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];
