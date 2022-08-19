import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { IPassenger } from '../../../../pages/search/components/searchModalConfirmation/searchModal.validate';
import { TResponseReservations } from '../../queries/reservations/useSearchReservations';
import { postCreateReservation } from '../../request';

export type TCreateReservation = {
  passengers: IPassenger[];
  origin: string;
  destination: string;
  goBack: boolean;
  data_go: string;
  data_back?: string;
  total: number;
};

const useCreateReservation: () => UseMutationResult<
  TResponseReservations,
  any,
  TCreateReservation,
  unknown
> = () => {
  const serverStore = useQueryClient();

  return useMutation(postCreateReservation, {
    onSuccess: async (data: TResponseReservations) => {
      serverStore.setQueryData<TResponseReservations[]>(
        'reservations',
        (oldData) => {
          if (oldData && oldData.filter((e) => e.id === data.id).length) {
            return oldData;
          } else {
            return oldData?.length ? [data, ...oldData] : [data];
          }
        },
      );
    },
  });
};

export default useCreateReservation;
