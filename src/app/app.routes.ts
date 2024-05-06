import {Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {RegistrationComponent} from './pages/auth/components/registration/registration.component';
import {LoginComponent} from './pages/auth/components/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegistrationComponent,
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
  },
];
