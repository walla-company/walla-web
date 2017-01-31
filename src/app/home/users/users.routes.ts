import { Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersFormComponent } from './users-form.component';

export const UsersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/edit/:id',
    component: UsersFormComponent
  }
];
