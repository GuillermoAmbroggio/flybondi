import { Form, notification } from 'antd';
import React, { useEffect } from 'react';
import { Button, Input } from '../../molecules';
import { validateMessagesRegister } from './formRegister.validate';
import styles from './formRegister.module.less';
import { Column, Flex } from '../../pages/layout';
import { Text } from '../../atoms';
import { IRegister } from '../../utils/types/UserTypes';
import { useRegister } from '../../particules/serverStore/mutations';
import { useClientStore, useGetErrorApi } from '../../hooks';

interface IFormRegisterProps {
  onClickLogin?: () => void;
  onConfirmRegister?: (values: IRegister) => Promise<void>;
  onCloseModal?: () => void;
}

const FormRegister: React.FC<IFormRegisterProps> = ({
  onClickLogin,
  onConfirmRegister,
  onCloseModal,
}) => {
  const [formRegister] = Form.useForm<IRegister>();
  const { mutate, isLoading, isError, error } = useRegister();
  const { authentication } = useClientStore();
  const { user } = authentication;

  const initialValuesModalFormRegister: IRegister = {
    email: '',
    password: '',
    confirm_password: '',
    name: '',
    lastname: '',
  };
  const handleConfirmRegister = async (values: IRegister) => {
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
      const errString = useGetErrorApi(error.response.data);
      notification.error({
        message: errString,
        placement: 'top',
      });
    }
  }, [isError]);

  return (
    <Form
      name='form-Register'
      onFinish={onConfirmRegister ?? handleConfirmRegister}
      validateMessages={validateMessagesRegister}
      layout='vertical'
      initialValues={initialValuesModalFormRegister}
      form={formRegister}
      className={styles.container}
    >
      <Column className={styles.container_forms}>
        <Text variant='title'>Crear una cuenta nueva</Text>
        <Flex>
          <Form.Item
            label='Nombre'
            name='name'
            rules={[{ required: true }]}
            className={styles.mr16}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Apellido'
            name='lastname'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Flex>
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
        <Form.Item
          label='Confirmar contraseña'
          name='confirm_password'
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className={styles.container_buttonSubmit}>
          <Button
            text='Registarse'
            type='primary'
            htmlType='submit'
            className={styles.buttonStyles}
            loading={isLoading}
          />
        </Form.Item>
        <Flex className={styles.container_footerText}>
          <Text>Si ya tienes cuenta </Text>
          <Text
            variant='link'
            color='colordefault'
            className={styles.ml8}
            onClick={onClickLogin}
          >
            Inicia sesión
          </Text>
        </Flex>
      </Column>
    </Form>
  );
};

export default FormRegister;
