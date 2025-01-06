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

console.log('Starting application bootstrap...');

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(UpgradeModule),
    SettingsService,
    UpgradeService
  ]
}).then((ref: ApplicationRef) => {
  console.log('Angular bootstrap complete');
  const upgrade = ref.injector.get(UpgradeModule);

  console.log('Starting AngularJS bootstrap...');
  upgrade.bootstrap(document.body, ['AdminApp'], {
    strictDi: true
  });
  console.log('AngularJS bootstrap complete');
}).catch(err => {
  console.error('Bootstrap error:', err);
});
