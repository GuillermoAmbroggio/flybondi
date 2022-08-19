import React from 'react';
import { Text } from '../../atoms';
import { Column, Flex } from '../../pages/layout';
import styles from './pdfConfirmation.module.less';
import { TResponseReservations } from '../../particules/serverStore/queries/reservations/useSearchReservations';
import { countryTypes } from '../../utils/types/countryTypes';

interface IPdfConfirmationProps {
  values: TResponseReservations;
}

const PdfConfirmation: React.FC<IPdfConfirmationProps> = ({ values }) => {
  return (
    <div className={styles.containerPdf}>
      <Column className={styles.headerPdf}>
        <Text variant='bodyBig'>Resumen de tu vuelo</Text>
      </Column>

      <Flex>
        <Text variant='bodyBold' style={{ marginRight: 8 }}>
          Número de vuelo:
        </Text>
        <Text>{`#${values.id}`}</Text>
      </Flex>
      <Flex>
        <Text variant='bodyBold' style={{ marginRight: 8 }}>
          Origen:
        </Text>
        <Text>{countryTypes[values.origin]}</Text>
      </Flex>
      <Flex>
        <Text variant='bodyBold' style={{ marginRight: 8 }}>
          Destino:
        </Text>
        <Text>{countryTypes[values.destination]}</Text>
      </Flex>
      <Flex>
        <Text variant='bodyBold' style={{ marginRight: 8 }}>
          Tipo:
        </Text>
        <Text>{values.goBack ? 'Ida y vuelta' : 'Solo ida'}</Text>
      </Flex>
      <Text variant='bodyBold'>{`Pasajeros  (${values.passengers.length}):`}</Text>
      {values.passengers.map((passenger, i) => (
        <Text
          key={i}
        >{`- ${passenger.name} ${passenger.lastname} ${passenger.age} años`}</Text>
      ))}

      <Flex>
        <Text variant='bodyBold' style={{ marginRight: 8 }}>
          Costo total:
        </Text>
        <Text>$22</Text>
      </Flex>
      <Column className={styles.footerPdf}>
        <Text variant='bodyExtraSmall'>
          ¡Gracias por tu compra! Recorda que cada pasajero debe presentar su
          dni el dia del vuelo
        </Text>
      </Column>
    </div>
  );
};

export default PdfConfirmation;
