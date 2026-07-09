export interface User {
  id?: number;
  username: string;
  password?: string;
  fullName: string;
  email: string;
  mobile: string;
  role?: string;
  active: boolean;
}
