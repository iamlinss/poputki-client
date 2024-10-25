import {Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {RegistrationComponent} from './pages/auth/components/registration/registration.component';
import {LoginComponent} from './pages/auth/components/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {EditProfileComponent} from './pages/profile/components/edit-profile/edit-profile.component';
import {AddCarComponent} from './pages/profile/components/add-car/add-car.component';
import {AllChatsComponent} from './pages/all-chats/all-chats.component';
import {AddTripComponent} from './pages/profile/components/add-trip/add-trip.component';
import {TripsComponent} from './pages/trips/trips.component';
import {authGuard} from './common/guards/auth.guard';
import {TripsPassengerComponent} from './pages/trips-passenger/trips-passenger.component';
import {FeedbackComponent} from "./pages/feedback/feedback.component";

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
    canActivate: [authGuard],
  },
  {
    path: 'profile/edit',
    pathMatch: 'full',
    component: EditProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/add/car',
    pathMatch: 'full',
    component: AddCarComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/add/trip',
    pathMatch: 'full',
    component: AddTripComponent,
    canActivate: [authGuard],
  },
  {
    path: 'all-chats',
    pathMatch: 'full',
    component: AllChatsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'trips',
    pathMatch: 'full',
    component: TripsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'trips/feedback',
    pathMatch: 'full',
    component: FeedbackComponent,
    canActivate: [authGuard],
  },
  {
    path: 'trips-passenger',
    pathMatch: 'full',
    component: TripsPassengerComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
