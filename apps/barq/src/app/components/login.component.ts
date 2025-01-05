import { Component, OnInit } from '@angular/core';
import { UpgradeService } from '../../upgrade/upgrade.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div>
      <!-- Your component template -->
    </div>
  `
})
export class LoginComponent implements OnInit {
  constructor(private upgradeService: UpgradeService) {}

  ngOnInit() {
    try {
      const authService = this.upgradeService.upgradeService<unknown>('authService');
      console.log('AuthService loaded:', authService);
    } catch (err) {
      console.error('Error loading AngularJS service:', err);
    }
  }
}
