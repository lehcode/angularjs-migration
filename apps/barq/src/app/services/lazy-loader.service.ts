import { Injectable } from '@angular/core';
import * as angular from 'angular';

@Injectable({
  providedIn: 'root'
})
export class LazyLoaderService {
  private app: angular.auto.IInjectorService | undefined;

  async loadLogin(el: HTMLElement): Promise<void> {
    try {
      // Use the @legacy alias path
      const { loginControllerFactory } = await import('@legacy/app/controllers/LoginController');
      const { authServiceFactory } = await import('@legacy/app/services/authService');

      // Create a new module for login functionality
      const loginApp = angular.module('loginApp', ['AdminApp']);

      // Register components
      loginApp.controller('LoginController', loginControllerFactory);
      loginApp.factory('authService', authServiceFactory);

      // Bootstrap the module
      this.app = angular.bootstrap(el, ['AdminApp'], {
        strictDi: true
      });

    } catch (e) {
      console.error('Error loading login module:', e);
      throw e; // Re-throw to handle it in the calling code
    }
  }

  destroy() {
    if (this.app) {
      this.app.get('$rootScope').$destroy();
    }
  }
}
