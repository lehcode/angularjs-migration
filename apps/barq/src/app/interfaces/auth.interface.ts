export interface LoginCredentials {
  username: string;
  phone?: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  data: {
    attributes: {
      token: string;
    };
  };
}

export interface UserResponse {
  status: string;
  data: Array<UserData>;
}

export interface UserData {
  id: number;
  username: string;
  phone: string;
  role: string;
  authToken?: string;
}
