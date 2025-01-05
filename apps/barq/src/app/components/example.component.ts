import { Component, inject } from '@angular/core';
import { UpgradeService } from '../../upgrade/upgrade-helpers';

@Component({
  selector: 'app-example',
  standalone: true,
  template: `
    <div>
      <!-- Your component template -->
    </div>
  `
})
export class ExampleComponent {
  private upgradeService = inject(UpgradeService);

  // Get AngularJS service
  private legacyAuthService = this.upgradeService.upgradeService<any>('authService');

  // @ts-expect-error no-debugger
  debugger;
}
