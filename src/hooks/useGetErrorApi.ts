import { logger } from '../utils';

type IError = { [key: string]: string[] } | undefined;

const useGetErrorApi = (error: IError) => {
  if (typeof error === 'string') {
    logger(error);
    return 'Ocurrio un error, por favor intentalo de nuevo';
  }
  if (error && Object.keys(error).length) {
    const firstKey = Object.keys(error)[0];
    return `${firstKey}: ${error[firstKey][0]}`;
  }
};

export default useGetErrorApi;
