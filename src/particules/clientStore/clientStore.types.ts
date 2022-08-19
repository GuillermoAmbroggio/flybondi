import { IAuth, IUser } from '../../utils/types/UserTypes';
import { TTrips } from '../serverStore/queries/trips/useSearchTrips';
import { Actions } from './actions';

export type ClientDispatch = {
  dispatch: (action: Actions) => void;
};

export type ClientStore = {
  authentication: {
    user: IUser | null;
    auth: IAuth | null;
  };
  isLoading: boolean;
  tripSummary: {
    origin?: TTrips;
    destination?: TTrips | null;
  };
};
