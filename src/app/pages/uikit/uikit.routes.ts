import { Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { FormLayoutDemo } from './formlayoutdemo';


export default [
    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDemo },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
