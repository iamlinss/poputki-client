import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {environment} from '../environments/environment.dev';
import {TokenInterceptor} from './common/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    {provide: 'BACKEND_API_URL', useValue: environment.backendApiUrl},
  ],
};
