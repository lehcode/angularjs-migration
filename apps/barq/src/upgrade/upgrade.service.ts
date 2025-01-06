import { Injectable } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  constructor(private upgradeModule: UpgradeModule) {}

  async waitForAngularJS(): Promise<void> {
    if (!this.upgradeModule.$injector) {
      return new Promise((resolve) => {
        const maxAttempts = 50;
        let attempts = 0;

        const interval = setInterval(() => {
          attempts++;

          if (this.upgradeModule.$injector) {
            console.log('AngularJS injector found');
            clearInterval(interval);
            resolve();
          }

          if (attempts >= maxAttempts) {
            console.error('AngularJS initialization timeout');
            clearInterval(interval);
            resolve(); // Resolve anyway to prevent hanging
          }
        }, 100);
      });
    }
    return Promise.resolve();
  }

  async getService<T>(name: string): Promise<T> {
    await this.waitForAngularJS();

    if (!this.upgradeModule.$injector) {
      throw new Error('AngularJS injector not available');
    }

    try {
      const service = this.upgradeModule.$injector.get(name);
      console.log(`Service ${name} retrieved:`, service);
      return service;
    } catch (error) {
      console.error(`Error getting service ${name}:`, error);
      throw error;
    }
  }

  hasService(name: string): boolean {
    return this.upgradeModule.$injector?.has(name) ?? false;
  }
}
