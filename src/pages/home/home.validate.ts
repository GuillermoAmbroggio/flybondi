export type TValuesCity = {
  city_from: string;
  city_to: string;
  passengers: string;
};

export type TValuesPrice = {
  price_min: number;
  price_max: number;
  passengers: number;
};

export const validateMessagesCity = {
  required: 'Campo requerido',
  types: {
    number: 'Debe ser un número',
  },
  number: {
    max: 'Alcanzaste la máxima cantidad de pasajeros para reservas en la web',
    min: 'Debes seleccionar minimo un pasajero',
  },
};

export const validateMessagesPrice = {
  required: 'Campo requerido',
  types: {
    number: 'Debe ser un número',
  },
  number: {
    max: 'El valor maximo disponible es de ${max}',
    min: 'El valor minimo disponible es de ${min}',
  },
};
