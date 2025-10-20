import { Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { FormLayoutDemo } from './formlayoutdemo';
import { TableDemo } from './tabledemo';


export default [
    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDemo },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, component: FormLayoutDemo },
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDemo },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
