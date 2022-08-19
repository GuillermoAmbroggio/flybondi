import { useQuery } from 'react-query';
import { getMinMaxPrice } from '../../request';

type ResMinMaxPrice = {
  min: number;
  max: number;
};

export default function useMinMaxPrice() {
  return useQuery<ResMinMaxPrice>('min-max-price', () => getMinMaxPrice());
}
