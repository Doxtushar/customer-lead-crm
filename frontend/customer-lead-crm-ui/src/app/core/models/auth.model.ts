export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  username?: string;
  name?: string;
  role?: string;
}

export interface CurrentUser {
  username: string;
  name: string;
  role?: string;
  token?: string;
}
