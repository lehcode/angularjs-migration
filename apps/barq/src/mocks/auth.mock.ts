import { LoginResponse, UserResponse } from "../app/interfaces/auth.interface";

export const MOCK_LOGIN_RESPONSE: LoginResponse = {
  status: 'success',
  data: {
    attributes: {
      token: 'mock-jwt-token-12345'
    }
  }
};

export const MOCK_USER_RESPONSE: UserResponse = {
  status: 'success',
  data: [{
    id: 1,
    username: 'testadmin',
    phone: '+1234567890',
    role: 'admin'
  }]
};
