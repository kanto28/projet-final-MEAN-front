import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { RegisterComponent } from './register/register.component';
import { ValidationComponent } from './validation/validation.component';

export default [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'register', component: RegisterComponent },
    { path: 'validation', component: ValidationComponent }
] as Routes;
