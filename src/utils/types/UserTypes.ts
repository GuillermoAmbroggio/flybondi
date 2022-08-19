export type IAuth = {
  csrfToken: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type IRegister = {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  lastname: string;
};

export type IUser = {
  email: string;
  name: string;
  lastname: string;
  password: string;
  phone?: string;
  country?: string;
  birthdate?: string;
};

export type IPassengers = {
  name: string;
  lastname: string;
  age: number;
};
