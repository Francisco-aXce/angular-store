export interface LoginUser {
  email: string;
  password: string;
}

export interface User extends LoginUser {
  name: string;
  surname: string;
  dni: string;
  phone: string;
}
