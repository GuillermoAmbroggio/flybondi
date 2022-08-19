import { axiosFetch } from '../../../../utils';

type IGetReservations = () => Promise<any>;

const getReservations: IGetReservations = async () => {
  return await axiosFetch(`/orders`).then((response) => {
    return response;
  });
};

export default getReservations;
