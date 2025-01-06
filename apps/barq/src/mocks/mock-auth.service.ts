import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { LoginCredentials, LoginResponse, UserResponse } from '../app/interfaces/auth.interface';
import { MOCK_LOGIN_RESPONSE, MOCK_USER_RESPONSE } from './auth.mock';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private readonly MOCK_DELAY = 800;

  /**
   * Simulates a login operation with a predefined delay
   * @param {LoginCredentials} credentials The user's credentials
   * @returns {Observable<LoginResponse>} A response containing a token
   * @throws {Error} If the credentials are invalid
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      return of(MOCK_LOGIN_RESPONSE).pipe(delay(this.MOCK_DELAY));
    }

    throw new Error('Invalid credentials');
  }

  /**
   * Simulates a user data retrieval operation with a predefined delay
   * @returns {Observable<UserResponse>} A response containing user data
   */
  getUserData(): Observable<UserResponse> {
    return of(MOCK_USER_RESPONSE).pipe(delay(this.MOCK_DELAY));
  }
}
