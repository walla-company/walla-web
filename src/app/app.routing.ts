import { Routes, RouterModule } from '@angular/router';

import { HomeRoutes } from './home/home.routing';

const appRoutes: Routes = [
    ...HomeRoutes,
    { path: '**', redirectTo: '/home/dashboard' }
];

export const routing = RouterModule.forRoot(appRoutes);
