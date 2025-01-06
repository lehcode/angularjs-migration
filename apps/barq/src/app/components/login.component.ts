import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeService } from '../../upgrade/upgrade.service';
import { IAuthService } from '../interfaces/auth-service.interface';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div #loginContainer layout="row" layout-align="center center">
      <div
        layout="column"
        layout-align="center center"
        style="width: 100%; height: 100vh"
      >
        <div layout="row" layout-align="center center">
          <div layout="column">
            <p>AdminApp, v<span app-version></span></p>
            <form name="loginForm" id="loginForm" flex layout="column">
              <mat-form-field>
                <mat-label>Username</mat-label>
                <input
                  matInput
                  type="text"
                  ng-model="user.username"
                  name="username"
                  required
                  md-minlength="5"
                />
              </mat-form-field>

              <mat-form-field>
                <mat-label>Phone</mat-label>
                <input
                  matInput
                  type="text"
                  ng-model="user.phone"
                  name="phone"
                />
                <!-- &lt;!&ndash;
                <div ng-messages="loginForm.user.phone.$error">
                  <div ng-message="required">Phone is required!</div>
                </div>
                &ndash;&gt; -->
              </mat-form-field>

              <mat-form-field>
                <mat-label>Password</mat-label>
                <input
                  matInput
                  type="password"
                  ng-model="user.password"
                  name="password"
                  required
                />
                <!--<div ng-messages="loginForm.user.password.$error">
                  <div ng-message="required">Password is required!</div>
                </div>-->
              </mat-form-field>

              <button
                mat-button
                class="md-primary md-accent"
                aria-label="Login"
                ng-click="doLogin()"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
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
