import { Injectable, inject } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Injectable({ providedIn: 'root' })
export class UpgradeService {
  private upgrade = inject(UpgradeModule);

  // Upgrade AngularJS service
  upgradeService<T>(name: string): T {
    return this.upgrade.$injector.get(name);
  }
}
