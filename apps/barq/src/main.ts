import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UpgradeModule } from '@angular/upgrade/static';
import { importProvidersFrom, ApplicationRef } from '@angular/core';
import { AppComponent } from './app/app.component';
import { SettingsService } from './app/services/settings.service';
import { UpgradeService } from './upgrade/upgrade.service';

// Import AngularJS dependencies
import 'angular';
import '@uirouter/angularjs';
import 'angular-sanitize';
import 'angular-resource';
import 'angular-route';
import 'angular-material';
import 'angular-material-icons';
import 'angular-ui-grid';
import 'angular-local-storage';
import 'angular-slimscroll';
import 'lf-ng-md-file-input';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(UpgradeModule),
    SettingsService,
    UpgradeService,
    {
      provide: 'settings',
      useFactory: (i: any) => i.get('settings'),
      deps: ['$injector']
    }
  ]
}).then((ref: ApplicationRef) => {
  const upgrade = ref.injector.get(UpgradeModule);

  // Bootstrap AngularJS with explicit strictDi mode
  upgrade.bootstrap(document.body, ['AdminApp'], {
    strictDi: true
  });

}).catch(err => {
  console.error('Bootstrap error:', err)
});
