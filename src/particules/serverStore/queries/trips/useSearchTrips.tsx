import { useQuery } from 'react-query';
import { getTrips } from '../../request';
import { ParamsSearch } from '../../request/trips/getTrips';

export type TTrips = {
  availability: number;
  createdAt: Date;
  data: string;
  destination: string;
  id: number;
  origin: string;
  price: number;
  updatedAt: string;
};

type ResSearchTrips = {
  count: number;
  last_page: number;
  next: null | string;
  previous: null | string;
  results: TTrips[];
};

export default function useSearchTrips(params: ParamsSearch) {
  return useQuery<ResSearchTrips>('trips', () => getTrips(params));
}
