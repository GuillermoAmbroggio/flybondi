import { Actions } from './actions';
import { ClientStore } from './clientStore.types';

const reducer = (draft: ClientStore, action: Actions): void => {
  switch (action.type) {
    case 'LOGOUT':
      void localStorage.removeItem('user');
      void localStorage.removeItem('auth');
      draft.authentication.user = null;
      draft.authentication.auth = null;
      break;

    case 'AUTH': {
      const { csrfToken } = action.payload;
      draft.authentication.auth = action.payload;
      void localStorage.setItem(
        'auth',
        JSON.stringify({
          csrfToken,
        }),
      );
      break;
    }

    case 'SET_USER': {
      const user = action.payload;
      draft.authentication.user = user;
      break;
    }

    case 'LOADING': {
      draft.isLoading = action.payload;
      break;
    }

    case 'SET_ORIGIN_TRIP': {
      draft.tripSummary.origin = action.payload;
      break;
    }
    case 'SET_DESTINATION_TRIP': {
      draft.tripSummary.destination = action.payload;
      break;
    }
    case 'CLEAN_TRIP': {
      draft.tripSummary = { origin: undefined, destination: undefined };
      break;
    }
    default:
      throw new Error('Invalid action type');
  }
};

export default reducer;
