import { axiosFetch } from '../../../../utils';

type IGetMinMaxPrice = () => Promise<any>;

const getMinMaxPrice: IGetMinMaxPrice = async () => {
  return await axiosFetch('/trips/min-max-price').then((response) => {
    return response;
  });
};

export default getMinMaxPrice;
