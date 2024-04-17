import {Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
  },
  // { path: "main", pathMatch: "full", component: HomeComponent },
];
