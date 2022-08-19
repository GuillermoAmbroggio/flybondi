import { axiosFetch } from '../../../../utils';
import { TCreateReservation } from '../../mutations/reservations/useCreateReservation';

type IPostCreateReservation = (body: TCreateReservation) => Promise<any>;

const postCreateReservation: IPostCreateReservation = async (body) => {
  return await axiosFetch("/orders", {
    method: 'POST',
    data: body,
  }).then((response) => {
    return response;
  });
};

export default postCreateReservation;
