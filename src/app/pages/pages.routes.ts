import { Routes } from '@angular/router';
import { Documentation } from '../features/documentation/documentation';
import { Crud } from '../features/crud/crud';
import { Empty } from '../features/empty/empty';
import { Countries } from './country/ui/countries/countries';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'countries', component: Countries },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
