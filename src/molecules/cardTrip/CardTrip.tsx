import React from 'react';
import { TTrips } from '../../particules/serverStore/queries/trips/useSearchTrips';
import { countryTypes } from '../../utils/types/countryTypes';
import Card from '../card/Card';
import { Text } from '../../atoms';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDate } from '../../hooks';
import { Column, Flex } from '../../pages/layout';
import { priceFormat } from '../../utils/format/Format';
import styles from './cardTrip.module.less';

interface ICardTripProps {
  tripData: TTrips;
  className?: string;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CardTrip: React.FC<ICardTripProps> = ({
  tripData,
  isSelected,
  className,
  onClick,
}) => {
  const { dayNumber, dayString, month, year } = useDate(
    new Date(tripData.data),
  );

  return (
    <Card
      isSelected={isSelected}
      className={`${className} ${styles.containerCardTrip}`}
      onClick={onClick}
    >
      <Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Column>
          <Flex
            className={styles.textCountries}
            style={{ alignItems: 'center' }}
          >
            <Text variant='title'>{`${
              countryTypes[tripData.origin] ?? tripData.origin
            } (${tripData.origin})`}</Text>
            <ArrowRightOutlined />
            <Text variant='title'>{`${
              countryTypes[tripData.destination] ?? tripData.destination
            }(${tripData.destination})`}</Text>
          </Flex>
          <Text>{`${dayString} ${dayNumber} de ${month} del ${year}`}</Text>
        </Column>
        <Column>
          <Flex style={{ justifyContent: 'center' }}>
            <Text variant='title'>{priceFormat(tripData.price)}</Text>
          </Flex>
          <Text>{`Pasajes disponibles: ${tripData.availability}`}</Text>
        </Column>
      </Flex>
    </Card>
  );
};

export default CardTrip;
