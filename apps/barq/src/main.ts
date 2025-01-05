import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UpgradeModule } from '@angular/upgrade/static';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { SettingsService } from './app/services/settings.service';

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
    // Register downgraded injector factory
    {
      provide: 'settings',
      useFactory: (i: any) => i.get('settings'),
      deps: ['$injector']
    }
  ]
}).then(ref => {
  const upgrade = ref.injector.get(UpgradeModule);
  upgrade.bootstrap(document.body, ['AdminApp']);
}).catch(err => console.error(err));
