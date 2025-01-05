import { Injectable } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  constructor(private upgradeModule: UpgradeModule) {}

  upgradeService<T>(name: string): T {
    if (!this.upgradeModule.$injector) {
      throw new Error('AngularJS injector is not available. Ensure AngularJS app is bootstrapped.');
    }
    return this.upgradeModule.$injector.get(name);
  }
}
