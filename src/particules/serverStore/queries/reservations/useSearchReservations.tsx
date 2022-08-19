import { useQuery } from 'react-query';
import { IPassenger } from '../../../../pages/search/components/searchModalConfirmation/searchModal.validate';
import { getReservations } from '../../request';

export type TResponseReservations = {
  id: number;
  passengers: IPassenger[];
  origin: string;
  destination: string;
  goBack: boolean;
  data_go: string;
  data_back?: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
    lastname: string;
  };
};

export default function useSearchReservations() {
  return useQuery<TResponseReservations[]>('reservations', getReservations);
}
