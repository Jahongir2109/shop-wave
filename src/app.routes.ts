import { Routes } from '@angular/router';
import { AppLayout } from './app/widgets/layout/ui/app.layout';
import { Dashboard } from './app/widgets/dashboard/dashboard';
import { Documentation } from './app/features/documentation/documentation';
import { Landing } from './app/widgets/landing/landing';
import { Notfound } from './app/features/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/widgets/auth/ui/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
