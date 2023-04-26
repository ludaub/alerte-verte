import { registerLocaleData } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import {
  APP_INITIALIZER,
  LOCALE_ID,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { ApiClient } from './app/api-client.service';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { Month } from './app/month';
import { Store } from './app/store.service';
import { environment } from './environments/environment';

registerLocaleData(localeFr);

if (environment.production) {
  enableProdMode();
}

function initializeAppFactory(
  apiClient: ApiClient,
  store: Store
): () => Observable<Array<Month>> {
  return () => {
    console.log('initializeAppFactory()');
    return apiClient
      .getMonths$()
      .pipe(tap((months) => store.months.set(months)));
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAppFactory,
      deps: [ApiClient, Store],
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
