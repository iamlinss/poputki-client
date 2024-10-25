import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {environment} from '../environments/environment.dev';
import {TokenInterceptor} from './common/interceptors/token.interceptor';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";
registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    provideRouter(routes),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    {provide: 'BACKEND_API_URL', useValue: environment.backendApiUrl},
  ],
};
