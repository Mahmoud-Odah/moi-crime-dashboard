export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}