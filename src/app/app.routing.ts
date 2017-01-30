import { Routes, RouterModule } from '@angular/router';

import { HomeRoutes } from './home/index';
import { LoginRoutes } from './login/index';

const appRoutes: Routes = [
    ...HomeRoutes,
    ...LoginRoutes,
    { path: '**', redirectTo: '/home' }
];

export const routing = RouterModule.forRoot(appRoutes);
