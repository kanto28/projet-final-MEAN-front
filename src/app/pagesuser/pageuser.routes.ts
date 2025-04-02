import { Routes } from '@angular/router';
import { Empty } from '../pages/empty/empty';
import { TestComponent } from '../pages/test/test.component';

export default [
     { path: 'empty', component: Empty },
      { path: 'test', component: TestComponent },
      { path: '**', redirectTo: '/notfound' }
] as Routes;