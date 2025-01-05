import { Injectable } from '@angular/core';
import { downgradeInjectable } from '@angular/upgrade/static';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  apiHost = 'http://localhost';
  apoPort = '8080';
  apiVersion = 'v1';
  appVersion = '0.0.1';
  apiRoot: string;

  constructor() {
    this.apiRoot = `${this.apiHost}/api/admin/${this.apiVersion}`;
  }

  // ... rest of settings implementation
}

// Make available to AngularJS
declare const angular: any;
angular
  .module('AdminApp')
  .factory('settings', downgradeInjectable(SettingsService) as any);
