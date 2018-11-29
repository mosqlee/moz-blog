

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import {LoginGard} from './gard/login.gard';

export const appRoute = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: 'login', component: LoginComponent },
    { path: 'main', loadChildren: './home/home.module#HomeModule' , canActivate:[LoginGard]}
];
