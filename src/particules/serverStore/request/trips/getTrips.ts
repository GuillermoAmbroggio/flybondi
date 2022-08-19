import { axiosFetch } from '../../../../utils';

export type ParamsSearch = {
  page?: string | number;
  price_max?: string | number;
  price_min?: string | number;
  passengers?: string | number;
  city_to?: string;
  city_from?: string;
  date_since?: string;
  date_to?: string;
  sort?: { by: 'price' | 'data'; type: 'ASC' | 'DESC' };
};

type IGetTrips = (params: ParamsSearch) => Promise<any>;

const getTrips: IGetTrips = async ({
  page,
  passengers,
  price_max,
  price_min,
  city_to,
  city_from,
  sort,
}) => {
  return await axiosFetch(
    `/trips?${page ? 'page=' + page : ''}${
      price_min ? '&price_min=' + price_min : ''
    }${price_max ? '&price_max=' + price_max : ''}${
      passengers ? '&passengers=' + passengers : ''
    }${city_to ? '&city_to=' + city_to : ''}${
      city_from ? '&city_from=' + city_from : ''
    }${sort ? `&sort_by=${sort.by}&sort_type=${sort.type}` : ''}`,
  ).then((response) => {
    return response;
  });
};

export default getTrips;
