import { Routes, RouterModule } from '@angular/router';

import { HomeRoutes } from './home/home.routing';
import { LoginRoutes } from './login/login.routing';

const appRoutes: Routes = [
    ...HomeRoutes,
    ...LoginRoutes,
    { path: '**', redirectTo: '/home/dashboard' }
];

export const routing = RouterModule.forRoot(appRoutes);
