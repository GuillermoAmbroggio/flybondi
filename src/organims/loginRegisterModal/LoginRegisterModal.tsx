import { Modal } from 'antd';
import React, { useState } from 'react';
import FormLogin from '../formLogin/FormLogin';
import FormRegister from '../formRegister/FormRegister';

interface ILoginRegisterModalProps {
  onCloseModal: () => void;
  visibleModal: boolean;
  step: 'login' | 'register';
}

const LoginRegisterModal: React.FC<ILoginRegisterModalProps> = ({
  onCloseModal,
  visibleModal,
  step,
}) => {
  const [stepsAccount, setStepsAccount] = useState<'register' | 'login'>(step);
  const isLogin = stepsAccount === 'login';

  return (
    <Modal
      title={isLogin ? 'Iniciar Sesión' : 'Crear una cuenta nueva'}
      visible={visibleModal}
      onCancel={onCloseModal}
      footer={null}
      width='min-content'
    >
      {isLogin ? (
        <FormLogin
          onClickRegister={() => {
            setStepsAccount('register');
          }}
          onCloseModal={onCloseModal}
        />
      ) : (
        <FormRegister
          onClickLogin={() => setStepsAccount('login')}
          onCloseModal={onCloseModal}
        />
      )}
    </Modal>
  );
};

export default LoginRegisterModal;
