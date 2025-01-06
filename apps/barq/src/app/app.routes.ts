import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    /**
     * A function that lazily loads the LoginComponent.
     *
     * The reason for using this function instead of directly referencing the
     * LoginComponent is that the LoginComponent is not part of the main bundle.
     * Instead it is a separate module that is loaded on demand.
     *
     * @returns The LoginComponent
     */
    loadComponent: () => import('./components/login.component')
      .then(m => m.LoginComponent)
  }
];
