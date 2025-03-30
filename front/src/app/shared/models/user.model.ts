export interface User {
  id: number;
  username: string;
  password?: string;
  token?: string;
  name: string;
  role: string;
}
