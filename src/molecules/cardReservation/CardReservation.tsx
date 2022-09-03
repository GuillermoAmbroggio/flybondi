import React from 'react';
import { countryTypes } from '../../utils/types/countryTypes';
import Card from '../card/Card';
import { Text } from '../../atoms';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDate, useSizeScreen } from '../../hooks';
import { Column, Flex } from '../../pages/layout';
import { priceFormat } from '../../utils/format/Format';
import styles from './cardReservation.module.less';
import { TResponseReservations } from '../../particules/serverStore/queries/reservations/useSearchReservations';
import { Tag } from 'antd';

interface ICardReservationProps {
  reservationData: TResponseReservations;
  className?: string;
}

const CardReservation: React.FC<ICardReservationProps> = ({
  reservationData,
  className,
}) => {
  const { dayNumber, dayString, month, year } = useDate(
    new Date(reservationData.data_go),
  );
  const isBig = useSizeScreen() === 'big';

  const { goBack } = reservationData;

  return (
    <Card className={`${className} ${styles.containerCardTrip}`}>
      <Flex className={styles.contentContainer}>
        <Column>
          <Flex className={styles.textCountries}>
            <Flex alignItems={'center'}>
              <Text variant={isBig ? 'title' : 'bodyBold'}>{`${
                countryTypes[reservationData.origin] ?? reservationData.origin
              } (${reservationData.origin})`}</Text>
              <ArrowRightOutlined />
              <Text variant={isBig ? 'title' : 'bodyBold'}>{`${
                countryTypes[reservationData.destination] ??
                reservationData.destination
              }(${reservationData.destination})`}</Text>
            </Flex>
            <Tag
              color={goBack ? 'green' : 'orange'}
              className={styles.tagStyle}
            >
              {goBack ? 'Ida y vuelta' : ' Solo ida'}
            </Tag>
          </Flex>
          <Text>{`${dayString} ${dayNumber} de ${month} del ${year}`}</Text>
        </Column>
        <Column className={styles.footerStyles}>
          <Flex style={{ justifyContent: 'center' }}>
            <Text variant='title'>{`Total: ${priceFormat(
              reservationData.total,
            )}`}</Text>
          </Flex>
          <Text>{`Cantidad de pasajeros: ${reservationData.passengers.length}`}</Text>
        </Column>
      </Flex>
    </Card>
  );
};

export default CardReservation;
