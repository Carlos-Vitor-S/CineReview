import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,

      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideAnimations(),
    provideHttpClient(),
  ],
};
