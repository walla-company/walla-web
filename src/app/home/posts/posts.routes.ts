import { Routes } from '@angular/router';

import { PostsComponent } from './posts.component';
// import { UsersFormComponent } from './posts-form.component';

export const PostsRoutes: Routes = [
  {
    path: 'posts',
    component: PostsComponent
  },
  // {
  //   path: 'users/edit/:id',
  //   component: UsersFormComponent
  // }
];
