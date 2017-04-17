import { Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const UsersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/details/:user_id',
    component: UserDetailsComponent
  }
];
