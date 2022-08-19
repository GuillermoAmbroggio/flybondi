import { IUser } from '../../utils/types/UserTypes';
import { TTrips } from '../serverStore/queries/trips/useSearchTrips';

export type AuthActions =
  | { type: 'LOGOUT' }
  | {
      type: 'AUTH';
      payload: {
        csrfToken: string;
      };
    }
  | {
      type: 'SET_USER';
      payload: IUser;
    };

export type LoadingActions = {
  type: 'LOADING';
  payload: boolean;
};

export type tripsActions =
  | {
      type: 'SET_ORIGIN_TRIP';
      payload: TTrips;
    }
  | {
      type: 'SET_DESTINATION_TRIP';
      payload: TTrips | null | undefined;
    }
  | { type: 'CLEAN_TRIP' };

export type Actions = AuthActions | LoadingActions | tripsActions;
