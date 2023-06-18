export interface User {
  isBlocked?: boolean;
  name: string;
  surname: string;
  email: string;
  password?: string;
  userId?: string;
  role?: string;
}
