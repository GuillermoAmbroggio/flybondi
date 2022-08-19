type IuseDate = (date?: Date) => {
  dayNumber: number;
  dayString: string;
  month: string;
  monthNumber: number;
  year: number;
};

const useDate: IuseDate = (date) => {
  const dateValue = date ?? new Date();
  const dayObject: { [key: string]: string } = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miercoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sabado',
  };
  const monthObject: { [key: string]: string } = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };
  const dayString = dayObject[dateValue.getDay()];
  const dayNumber = dateValue.getUTCDate();
  const month = monthObject[dateValue.getMonth()];
  const monthNumber = dateValue.getMonth() + 1;
  const year = dateValue.getFullYear();
  return {
    dayNumber,
    dayString,
    month,
    monthNumber,
    year,
  };
};

export default useDate;
