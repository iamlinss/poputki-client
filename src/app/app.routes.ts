import {Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  // { path: "main", pathMatch: "full", component: HomeComponent },
];
