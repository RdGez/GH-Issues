import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideTanStackQuery, QueryClient, withDevtools } from '@tanstack/angular-query-experimental'
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideMarkdown(),
    provideRouter(routes),
    provideExperimentalZonelessChangeDetection(),
    provideTanStackQuery(new QueryClient(), withDevtools(() => ({ loadDevtools: true }))),
  ]
};
