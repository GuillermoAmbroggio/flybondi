import { Form, notification } from 'antd';
import React, { useEffect } from 'react';
import { Button, Input } from '../../molecules';
import { validateMessagesLogin } from './formLogin.validate';
import styles from './formLogin.module.less';
import { Column, Flex } from '../../pages/layout';
import { Text } from '../../atoms';
import { ILogin } from '../../utils/types/UserTypes';
import { useLogin } from '../../particules/serverStore/mutations';
import { useClientStore } from '../../hooks';

interface IFormLoginProps {
  onClickRegister?: () => void;
  onConfirmLogin?: (values: ILogin) => Promise<void>;
  onCloseModal?: () => void;
}

const FormLogin: React.FC<IFormLoginProps> = ({
  onClickRegister,
  onConfirmLogin,
  onCloseModal,
}) => {
  const [formLogin] = Form.useForm<ILogin>();
  const { mutate, isLoading, isError, error } = useLogin();
  const { authentication } = useClientStore();
  const { user } = authentication;

  const initialValuesModalFormLogin: ILogin = {
    email: '',
    password: '',
  };

  const handleConfirmLogin = async (values: ILogin) => {
    mutate(values);
  };

  /** Si inicio sesion el usuario cierro el modal del login */
  useEffect(() => {
    if (user) {
      if (onCloseModal) onCloseModal();
    }
  }, [user]);

  /** Detecta los errores devueltos por api */
  useEffect(() => {
    if (error && error.response?.data) {
      notification.error({
        message: error.response.data,
        placement: 'top',
      });
    }
  }, [isError]);

  return (
    <Form
      name='form-login'
      onFinish={onConfirmLogin ?? handleConfirmLogin}
      validateMessages={validateMessagesLogin}
      layout='vertical'
      initialValues={initialValuesModalFormLogin}
      form={formLogin}
      className={styles.container}
    >
      <Column className={styles.container_forms}>
        <Text variant='title'>Iniciar sesión</Text>
        <Form.Item label='Correo' name='email' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Contraseña'
          name='password'
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className={styles.container_buttonSubmit}>
          <Button
            text='Iniciar sesión'
            type='primary'
            htmlType='submit'
            className={styles.buttonStyles}
            loading={isLoading}
          />
        </Form.Item>
        <Flex>
          <Text>Si no tienes cuenta </Text>
          <Text
            variant='link'
            color='colordefault'
            className={styles.ml8}
            onClick={onClickRegister}
          >
            Crea una cuenta
          </Text>
        </Flex>
      </Column>
    </Form>
  );
};

export default FormLogin;
