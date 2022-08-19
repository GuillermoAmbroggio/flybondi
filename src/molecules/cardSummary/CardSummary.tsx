import { Avatar } from 'antd';
import React from 'react';
import { Text } from '../../atoms';
import { useClientStore, useDate } from '../../hooks';
import { Column, Flex } from '../../pages/layout';
import { priceFormat } from '../../utils/format/Format';
import { countryTypes } from '../../utils/types/countryTypes';
import Button from '../button/Button';
import Card from '../card/Card';
import styles from './cardSummary.module.less';
import { UserOutlined } from '@ant-design/icons';

interface ICardSummaryProps {
  handleSubmit: () => void;
  steps: 'origin' | 'destination';
  passengers?: number;
}

const CardSummary: React.FC<ICardSummaryProps> = ({
  handleSubmit,
  steps,
  passengers,
}) => {
  const { tripSummary } = useClientStore();
  const { origin, destination } = tripSummary;
  const dateOrigin = origin ? useDate(new Date(origin?.data)) : null;
  const dateDestination = destination
    ? useDate(new Date(destination?.data))
    : null;
  const totalDays =
    (dateDestination?.dayNumber || 0) - (dateOrigin?.dayNumber || 0);

  const total =
    (origin?.price ? origin.price * (passengers ?? 1) : 0) +
    (destination?.price ? destination.price * (passengers ?? 1) : 0);

  return (
    <Card>
      <Text variant='title'>Resumen de tu paquete</Text>
      {origin ? (
        <Column className={styles.itemsSummary}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center' className={styles.mr}>
              <i className='fas fa-plane' />
              <Text>{`${countryTypes[origin.origin]} a ${
                countryTypes[origin.destination]
              } (Ida)`}</Text>
            </Flex>
            <Flex alignItems='center'>
              <Avatar
                size={24}
                icon={<UserOutlined />}
                style={{ color: '#f9ba15', backgroundColor: 'white' }}
              />
              <Text>{`${passengers} x ${priceFormat(origin.price)} `}</Text>
            </Flex>
          </Flex>
        </Column>
      ) : null}

      {destination ? (
        <Column className={styles.itemsSummary}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center' className={styles.mr}>
              <i className='fas fa-plane' />
              <Text style={{ display: 'block' }}>{`${
                countryTypes[destination.origin]
              } a ${countryTypes[destination.destination]} (Vuelta)`}</Text>
            </Flex>
            <Flex alignItems='center'>
              <Avatar
                size={24}
                icon={<UserOutlined />}
                style={{ color: '#f9ba15', backgroundColor: 'white' }}
              />
              <Text>{`${passengers} x ${priceFormat(
                destination.price,
              )} `}</Text>
            </Flex>
          </Flex>
        </Column>
      ) : null}

      <Column className={styles.itemsSummaryTotal}>
        <Flex justifyContent='space-between'>
          <Text variant='bodyBig' style={{ display: 'block' }}>
            Total:
          </Text>
          <Text variant='bodyBig'>{priceFormat(total)}</Text>
        </Flex>
      </Column>

      {origin ? (
        <Column className={styles.itemsSummaryDate}>
          <Text variant='bodyExtraSmall'>
            {`${destination ? 'Desde' : 'Sale'} el ${dateOrigin?.dayNumber}/${
              dateOrigin?.monthNumber
            }/${dateOrigin?.year} `}
            {destination
              ? `hasta el ${dateDestination?.dayNumber}/${
                  dateDestination?.monthNumber
                }/${dateDestination?.year} ${
                  totalDays > 1 ? '(' + totalDays + ' Días)' : ''
                }`
              : ''}
          </Text>
        </Column>
      ) : null}

      <Button
        text={steps === 'origin' ? 'Continuar' : 'Reservar vuelo'}
        onClick={handleSubmit}
        className={styles.buttonSummary}
      />
    </Card>
  );
};

export default CardSummary;
