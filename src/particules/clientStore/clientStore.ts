import { ClientStore } from './clientStore.types';

export const initialClientStore: ClientStore = {
  authentication: {
    user: null,
    auth: null,
  },
  isLoading: false,
  tripSummary: { origin: undefined, destination: undefined },
};
