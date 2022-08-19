import { Form, Modal, notification, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { Input, Button, CardPayments } from '../../../../molecules';
import { TValuesModal, validateMessagesModal } from './searchModal.validate';
import styles from './searchModalConfirmation.module.less';
import { Text } from '../../../../atoms';
import { Column, Flex } from '../../../layout';
import cashImage from '../../../../assets/payments/cash.png';
import cardImage from '../../../../assets/payments/card.png';
import { PaymentsType } from '../../../../utils/types/PaymentsTypes';
import {
  alertSuccess,
  useClientStore,
  useGeneratePdf,
  useGetErrorApi,
} from '../../../../hooks';
import { FormLogin, FormRegister, PdfConfirmation } from '../../../../organims';
import { useCreateReservation } from '../../../../particules/serverStore/mutations';
import { TCreateReservation } from '../../../../particules/serverStore/mutations/reservations/useCreateReservation';
import { useNavigate } from 'react-router-dom';

interface ISearchModalConfirmationProps {
  onCloseModal: () => void;
  visibleModal: boolean;
  passengers?: number;
}

const paymentsMethods: {
  name: string;
  image: string;
  description: string;
  type: PaymentsType;
}[] = [
  {
    name: 'Efectivo',
    description: 'Pagar en el aeropuerto',
    image: cashImage,
    type: 'cash',
  },
  {
    name: 'Tarjeta',
    description: 'Usa tu tarjeta para pagar',
    image: cardImage,
    type: 'credit_card',
  },
];

const SearchModalConfirmation: React.FC<ISearchModalConfirmationProps> = ({
  visibleModal,
  onCloseModal,
  passengers,
}) => {
  const { authentication, tripSummary } = useClientStore();
  const { mutate, isSuccess, data, error, isError } = useCreateReservation();
  const navigate = useNavigate();
  const { user } = authentication;
  const isAuth = !!authentication.user;
  const [stepsAccount, setStepsAccount] = useState<null | 'register' | 'login'>(
    null,
  );

  const [formConfirmModal] = Form.useForm<TValuesModal>();
  const valuePaymentForm = Form.useWatch('payment', formConfirmModal);
  const passengersValue = Form.useWatch('passengers', formConfirmModal);
  const emailValue = Form.useWatch('email', formConfirmModal);

  const initialValuesModalForm: TValuesModal = {
    email: user?.email || '',
    passengers: [
      { age: '', lastname: user?.lastname || '', name: user?.name || '' },
    ],
    payment: 'cash',
  };

  const handleConfirm = async (values: TValuesModal) => {
    const total =
      (tripSummary.origin?.price
        ? tripSummary.origin.price * (passengers ?? 1)
        : 0) +
      (tripSummary.destination?.price
        ? tripSummary.destination.price * (passengers ?? 1)
        : 0);

    const payload: TCreateReservation = {
      origin: tripSummary.origin?.origin || '',
      destination: tripSummary.origin?.destination || '',
      data_go: tripSummary.origin?.data || '',
      goBack: !!tripSummary.destination,
      passengers: values.passengers,
      total,
      data_back: tripSummary.destination?.data,
    };

    await mutate(payload);
  };

  /** Maneja el estado de exito al crear una orden */
  useEffect(() => {
    if (isSuccess && data) {
      alertSuccess({
        title: '¡ Orden creada exitosamente !',
        permanent: true,
        message:
          'Porfavor guarda el comprobante genrado, es necesario para verificar tu vuelo.',
      });
      useGeneratePdf({
        content: <PdfConfirmation values={data} />,
        filename: `Orden-${data.id}`,
      });
      navigate('/');
    }
  }, [isSuccess]);

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

  /** Setea valores por default cuando existe un usuario y no se escribieron valores en los inputs */
  useEffect(() => {
    if (authentication.user) {
      if (emailValue && !emailValue?.length) {
        formConfirmModal.setFieldsValue({ email: authentication.user.email });
      }
      if (
        passengersValue &&
        !passengersValue[0].name.length &&
        !passengersValue[0].lastname.length &&
        passengersValue.length >= 1
      ) {
        formConfirmModal.setFieldsValue({
          passengers: [
            {
              name: authentication.user.name,
              lastname: authentication.user.lastname,
            },
          ],
        });
      }
    }
  }, [user]);

  return (
    <Modal
      title='Confirmar datos'
      visible={visibleModal}
      onCancel={onCloseModal}
      footer={null}
      width='min-content'
    >
      {!isAuth && stepsAccount && stepsAccount === 'login' ? (
        <FormLogin onClickRegister={() => setStepsAccount('register')} />
      ) : null}

      {!isAuth && stepsAccount && stepsAccount === 'register' ? (
        <FormRegister onClickLogin={() => setStepsAccount('login')} />
      ) : null}

      <Form
        name='form-modal-confirmation'
        onFinish={handleConfirm}
        validateMessages={validateMessagesModal}
        layout='vertical'
        initialValues={initialValuesModalForm}
        form={formConfirmModal}
      >
        <Form.List name='passengers'>
          {(fields, { add }) => {
            if (fields.length < (passengers || 1)) {
              add();
            }
            return (
              <>
                <Text variant='bodyBig' style={{ marginBottom: 16 }}>
                  Ingresá los datos{' '}
                  {passengers && passengers > 1 ? 'de los' : 'del'} pasajero:
                </Text>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className={styles.passengers}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label='Nombre'
                      rules={[{ required: true }]}
                    >
                      <Input placeholder='Nombre' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'lastname']}
                      label='Apellido'
                      rules={[{ required: true }]}
                      className={styles.passengers_left}
                    >
                      <Input placeholder='Apellido' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'age']}
                      label='Edad'
                      rules={[{ required: true }]}
                      className={styles.passengers_left}
                    >
                      <Input placeholder='Edad' />
                    </Form.Item>
                  </div>
                ))}
              </>
            );
          }}
        </Form.List>
        <Column>
          <Text variant='bodyBig' style={{ marginBottom: 16 }}>
            Elige una opcion de pago:
          </Text>
          <Form.Item name='payment'>
            <Radio.Group value={valuePaymentForm}>
              <Flex>
                {paymentsMethods.map((e, i) => {
                  return (
                    <CardPayments
                      key={i}
                      name={e.name}
                      description={e.description}
                      image={e.image}
                      valueRadio={e.type}
                      className={styles.cardsStyles}
                      isSelected={e.type === valuePaymentForm}
                      onClick={async () => {
                        await formConfirmModal.setFieldsValue({
                          payment: e.type,
                        });
                      }}
                    />
                  );
                })}
              </Flex>
            </Radio.Group>
          </Form.Item>
        </Column>
        <Column className={styles.columnEmail}>
          <Flex alignItems='center'>
            <Text variant='bodyBig' style={{ marginRight: 8 }}>
              Enviar detalle por correo:
            </Text>
            <Text variant='bodySmall'>(Opcional)</Text>
          </Flex>
          <Form.Item
            name='email'
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input placeholder='Ingresá un email' />
          </Form.Item>
        </Column>
        {!isAuth ? (
          <Flex alignItems={'center'}>
            <Text
              variant='link'
              color='colordefault'
              className={styles.mr8}
              onClick={() => setStepsAccount('register')}
            >
              Crea una cuenta
            </Text>
            <Text> para guardar tus reservas o</Text>
            <Text
              onClick={() => setStepsAccount('login')}
              variant='link'
              color='colordefault'
              className={styles.linkText}
            >
              Inicia sesion
            </Text>
            <Text>si ya tienes una</Text>
          </Flex>
        ) : null}

        <Form.Item className={styles.buttonStyles}>
          <Button text='Finalizar compra' type='primary' htmlType='submit' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SearchModalConfirmation;
