import { useMutation, UseMutationResult } from 'react-query';
import { alertSuccess, useClientStore } from '../../../../hooks';
import { IAuth, ILogin, IUser } from '../../../../utils/types/UserTypes';
import { getUser, postLogin } from '../../request';
import useLogout from './useLogout';

const useLogin: () => UseMutationResult<IAuth, any, ILogin, unknown> = () => {
  const { dispatch } = useClientStore();
  const { mutate } = useLogout();

  return useMutation(postLogin, {
    onSuccess: async (data) => {
      dispatch({ type: 'AUTH', payload: data });
      getUser()
        .then((user: IUser) => {
          dispatch({ type: 'SET_USER', payload: user });
          alertSuccess({
            title: `¡ Bienvenid@ nuevamente ${user.name} !`,
            time: 3,
          });
        })
        .catch(() => mutate());
    },
  });
};

export default useLogin;
