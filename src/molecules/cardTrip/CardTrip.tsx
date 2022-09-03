import React from 'react';
import { TTrips } from '../../particules/serverStore/queries/trips/useSearchTrips';
import { countryTypes } from '../../utils/types/countryTypes';
import Card from '../card/Card';
import { Text } from '../../atoms';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDate, useSizeScreen } from '../../hooks';
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
  const isBig = useSizeScreen() === 'big';

  return (
    <Card
      isSelected={isSelected}
      className={`${className} ${styles.containerCardTrip}`}
      onClick={onClick}
    >
      <Flex className={styles.contentCard}>
        <Column>
          <Flex
            className={styles.textCountries}
            style={{ alignItems: 'center' }}
          >
            <Text variant={isBig ? 'title' : 'bodyBold'}>{`${
              countryTypes[tripData.origin] ?? tripData.origin
            } (${tripData.origin})`}</Text>
            <ArrowRightOutlined />
            <Text variant={isBig ? 'title' : 'bodyBold'}>{`${
              countryTypes[tripData.destination] ?? tripData.destination
            }(${tripData.destination})`}</Text>
          </Flex>
          <Text>{`${dayString} ${dayNumber} de ${month} del ${year}`}</Text>
        </Column>
        <Column>
          <Flex justifyContent={'center'}>
            <Text variant='title'>{priceFormat(tripData.price)}</Text>
          </Flex>
          <Text>{`Pasajes disponibles: ${tripData.availability}`}</Text>
        </Column>
      </Flex>
    </Card>
  );
};

export default CardTrip;
