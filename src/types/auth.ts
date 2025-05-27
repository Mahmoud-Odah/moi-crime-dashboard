export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  role: String;
  name: string;
}

export interface AuthResponse {
  token: string;
}