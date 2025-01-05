import { Injectable } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  constructor(private upgradeModule: UpgradeModule) {}

  async waitForAngularJS(): Promise<void> {
    if (this.upgradeModule.$injector) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.upgradeModule.$injector && window.AdminApp) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  async getService<T>(name: string): Promise<T> {
    await this.waitForAngularJS();
    return this.upgradeModule.$injector.get(name);
  }
}
