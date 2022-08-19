import { PaymentsType } from '../../../../utils/types/PaymentsTypes';

export type IPassenger = {
  name: string;
  lastname: string;
  age: string | number;
};

export type TValuesModal = {
  passengers: IPassenger[];
  payment: PaymentsType;
  email: string;
};

export type TValuesModalRegister = {
  password: string;
  email: string;
  confirm_password: string;
  name: string;
  lastname: string;
};

export const validateMessagesModal = {
  required: 'El campo ${label} es requerido',
  types: {
    email: 'No es un correo valido',
  },
};
