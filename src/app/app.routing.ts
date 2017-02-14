import { Routes, RouterModule } from '@angular/router';

import { HomeRoutes } from './home/home.routes';
import { LoginRoutes } from './login/login.routes';

const appRoutes: Routes = [
    ...HomeRoutes,
    ...LoginRoutes,
    { path: '**', redirectTo: '/home/dashboard' }
];

export const routing = RouterModule.forRoot(appRoutes);
