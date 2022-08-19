import { Form, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { Text } from '../../atoms';
import { Button, Card, InputSelect, InputSlider } from '../../molecules';
import { Column } from '../layout';
import styles from './home.module.less';
import { UserOutlined } from '@ant-design/icons';
import {
  TValuesCity,
  TValuesPrice,
  validateMessagesCity,
  validateMessagesPrice,
} from './home.validate';
import { useNavigate } from 'react-router-dom';
import { useMinMaxPrice } from '../../particules/serverStore/queries';
import { arrayCountries } from '../../utils/types/countryTypes';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [formPrice] = Form.useForm<TValuesPrice>();
  const numberValueMin = Form.useWatch('price_min', formPrice);
  const numberValueMax = Form.useWatch('price_max', formPrice);
  const minMaxPrice = useMinMaxPrice();

  const initialValuesCity = {
    city_from: '',
    city_to: '',
    passengers: '',
  };
  const initialValuesPrice = {
    price_min: '',
    price_max: '',
    passengers: '',
  };

  const [formCity] = Form.useForm<{
    city_from: string;
    city_to: string;
    passengers: string;
  }>();

  const onChange = (newValue: number, type: 'price_min' | 'price_max') => {
    formPrice.setFieldsValue({ [type]: newValue });
  };
  const onSubmitByCity = (values: TValuesCity) => {
    navigate('/buscador', { state: values });
  };
  const onSubmitByPrice = (values: TValuesPrice) => {
    navigate('/buscador', { state: values });
  };
  useEffect(() => {
    if (minMaxPrice.data?.min) {
      formPrice.setFieldsValue({ price_min: minMaxPrice.data?.min });
    }
    if (minMaxPrice.data?.max) {
      formPrice.setFieldsValue({ price_max: minMaxPrice.data?.max });
    }
  }, [minMaxPrice.data]);
  return (
    <div className={styles.containerHome}>
      <Card
        title={<Text variant='title'>Arma tu viaje eligiendo tu destino</Text>}
        className={styles.cardStyle}
      >
        {/* Formulario para busqueda por ciudades */}
        <Form
          name='form-home-by-city'
          onFinish={onSubmitByCity}
          validateMessages={validateMessagesCity}
          layout='vertical'
          initialValues={initialValuesCity}
          form={formCity}
        >
          <div className={styles.contentCard}>
            <Column className={styles.columnStyle}>
              <Text variant='label'>Origen</Text>
              <Form.Item name='city_from' rules={[{ required: true }]}>
                <InputSelect
                  placeholder='Elige una ciudad'
                  dataSelect={arrayCountries}
                  onChange={(value) => {
                    formCity.setFieldsValue({ city_from: value });
                  }}
                />
              </Form.Item>
            </Column>
            <Column className={styles.columnStyle}>
              <Text variant='label'>Destino</Text>
              <Form.Item name='city_to' rules={[{ required: true }]}>
                <InputSelect
                  placeholder='Elige una ciudad'
                  dataSelect={arrayCountries}
                  onChange={(value) => {
                    formCity.setFieldsValue({ city_to: value });
                  }}
                />
              </Form.Item>
            </Column>
            <Column className={styles.columnStyle}>
              <Text variant='label'>Cantidad de pasajeros</Text>
              <Form.Item
                name='passengers'
                rules={[
                  { required: true },
                  { type: 'number', max: 14 },
                  { type: 'number', min: 1 },
                ]}
              >
                <InputNumber addonBefore={<UserOutlined />} size='large' />
              </Form.Item>
            </Column>
            <Button
              htmlType='submit'
              text='Buscar vuelos'
              size='large'
              className={styles.buttonStyle}
            />
          </div>
        </Form>
      </Card>

      <Card
        title={
          <Text variant='title'>Arma tu viaje eligiendo tu presupuesto</Text>
        }
      >
        {/* Formulario para busqueda por precios */}
        <Form
          name='form-home-by-price'
          onFinish={onSubmitByPrice}
          validateMessages={validateMessagesPrice}
          layout='vertical'
          initialValues={initialValuesPrice}
          form={formPrice}
        >
          <div className={styles.contentCard}>
            <Column className={styles.columnStyle}>
              <Text variant='label'>Precio minimo</Text>
              <Form.Item
                name='price_min'
                rules={[
                  { required: true },
                  { type: 'number', max: 800 },
                  { type: 'number', min: 1 },
                ]}
              >
                <InputSlider
                  onChangeSlider={(newValue: number) =>
                    onChange(newValue, 'price_min')
                  }
                  maxValue={minMaxPrice.data?.max}
                  minValue={minMaxPrice.data?.min}
                  numberValue={numberValueMin}
                  name='price_min'
                />
              </Form.Item>
            </Column>
            <Column className={styles.columnStyle}>
              <Text variant='label'>Precio maximo</Text>
              <Form.Item
                name='price_max'
                rules={[
                  { required: true },
                  { type: 'number', max: 800 },
                  { type: 'number', min: 1 },
                ]}
              >
                <InputSlider
                  onChangeSlider={(newValue: number) =>
                    onChange(newValue, 'price_max')
                  }
                  maxValue={minMaxPrice.data?.max}
                  minValue={minMaxPrice.data?.min}
                  numberValue={numberValueMax}
                  name='price_max'
                />
              </Form.Item>
            </Column>

            <Column className={styles.columnStyle}>
              <Text variant='label'>Cantidad de pasajeros</Text>
              <Form.Item
                name='passengers'
                rules={[
                  { required: true },
                  { type: 'number', max: 14 },
                  { type: 'number', min: 1 },
                ]}
              >
                <InputNumber addonBefore={<UserOutlined />} size='large' />
              </Form.Item>
            </Column>
            <Button
              text='Buscar vuelos'
              size='large'
              className={styles.buttonStyle}
              htmlType='submit'
            />
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Home;
