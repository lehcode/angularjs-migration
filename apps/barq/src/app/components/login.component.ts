import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeService } from '../../upgrade/upgrade.service';
import { IAuthService } from '../interfaces/auth-service.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Your login template here -->
    </div>
  `
})
export class LoginComponent implements OnInit {
  constructor(private upgradeService: UpgradeService) {}

  async ngOnInit() {
    try {
      const authService = await this.upgradeService.getService<IAuthService>('authService');
      console.log('AuthService loaded:', authService);

      // Now you can use the service
      const authData = await authService.getAuthData();
      console.log('Auth data:', authData);
    } catch (err) {
      console.error('Error loading AngularJS service:', err);
    }
  }
}
