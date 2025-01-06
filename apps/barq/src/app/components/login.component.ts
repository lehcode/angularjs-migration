import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeService } from '../../upgrade/upgrade.service';
import { IAuthService } from '../interfaces/auth-service.interface';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { MockAuthService } from '../../mocks/mock-auth.service';
import { LoginCredentials } from '../interfaces/auth.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Added this
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  template: `
    <div #loginContainer layout="row" layout-align="center center">
      <div *ngIf="isLoading" class="fixed top-0 left-0 w-full">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </div>

      <div
        layout="column"
        layout-align="center center"
        style="width: 100%; height: 100vh"
      >
        <div layout="row" layout-align="center center">
          <div layout="column">
            <p>AdminApp, v<span app-version></span></p>
            <form [formGroup]="loginForm" (ngSubmit)="doLogin()" name="loginForm" id="loginForm" flex layout="column">

            <mat-form-field class="w-full">
              <mat-label>Username</mat-label>
              <input
                matInput
                type="text"
                formControlName="username"
                placeholder="Enter username (hint: admin)"
                required
              />
              <mat-error *ngIf="loginForm.get('username')?.errors?.['required']">
                Username is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('username')?.errors?.['minlength']">
                Username must be at least 5 characters
              </mat-error>
            </mat-form-field>

              <mat-form-field class="w-full">
                <mat-label>Phone (Optional)</mat-label>
                <input
                  matInput
                  type="text"
                  formControlName="phone"
                  placeholder="Enter phone number"
                />
              </mat-form-field>

              <mat-form-field class="w-full">
                <mat-label>Password</mat-label>
                <input
                  matInput
                  [type]="hidePassword ? 'password' : 'text'"
                  formControlName="password"
                  placeholder="Enter password (hint: admin)"
                  required
                />
                <mat-error *ngIf="loginForm.get('password')?.errors?.['required']">
                  Password is required
                </mat-error>
              </mat-form-field>

              <div *ngIf="errorMessage" class="text-red-500 text-sm mt-2 mb-2">
                {{ errorMessage }}
              </div>

              <button
                mat-raised-button
                color="primary"
                type="submit"
                class="w-full"
                [disabled]="loginForm.invalid || isLoading"
              >
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </button>

              <div class="mt-4 text-sm text-gray-500 text-center">
                <p>Development Mode Credentials:</p>
                <p>Username: admin</p>
                <p>Password: admin</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(MockAuthService);

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  hidePassword = true;

  constructor(private upgradeService: UpgradeService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      phone: [''],
      password: ['', Validators.required],
    });
  }

  async ngOnInit() {
    console.log('LoginComponent initializing...');
    try {
      console.log('Getting authService...');
      const authService = await this.upgradeService.getService<IAuthService>('authService');

      const authData = await authService.getAuthData();
      console.log('Auth data:', authData);
    } catch (err) {
      console.error('Error in LoginComponent initialization:', err);

      if (window.AdminApp) {
        console.log('Available services:', Object.keys(window.AdminApp._invokeQueue));
      }
    }
  }

  doLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials: LoginCredentials = this.loginForm.value;

      this.authService
        .login(credentials)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (loginResponse) => {
            // Store token
            localStorage.setItem('token', loginResponse.data.attributes.token);

            // Get user data
            this.authService.getUserData().subscribe({
              next: (userResponse) => {
                // Store user data
                localStorage.setItem('user', JSON.stringify(userResponse.data[0]));
                this.router.navigate(['/dashboard']);
              },
              error: (error) => {
                console.error('Error fetching user data:', error);
                this.errorMessage = 'Error fetching user data';
              },
            });
          },
          error: (error) => {
            console.error('Login error:', error);
            this.errorMessage = error.message || 'Invalid credentials';
            // TODO: Add error handling with toastr or similar
          },
        });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
