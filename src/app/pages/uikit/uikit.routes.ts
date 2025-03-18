import { Routes } from '@angular/router';
import { MenuDemo } from './menudemo';

export default [
    { path: 'menu', data: { breadcrumb: 'Menu' }, component: MenuDemo },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
