import { useMutation, UseMutationResult } from 'react-query';
import { alertSuccess, useClientStore } from '../../../../hooks';
import { IAuth, IUser } from '../../../../utils/types/UserTypes';
import { getUser, postRegister } from '../../request';

import useLogout from './useLogout';

const useRegister: () => UseMutationResult<IAuth, any, IUser, unknown> = () => {
  const { dispatch } = useClientStore();
  const { mutate } = useLogout();
  return useMutation(postRegister, {
    onSuccess: async (data) => {
      dispatch({ type: 'AUTH', payload: data });
      getUser()
        .then((user: IUser) => {
          dispatch({ type: 'SET_USER', payload: user });
          alertSuccess({
            title: `¡ Bienvenid@ ${user.name} !`,
            time: 3,
            message: 'Cuenta creada exitosamente',
          });
        })
        .catch(() => {
          mutate();
        });
    },
  });
};

export default useRegister;
