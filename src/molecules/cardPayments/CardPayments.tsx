import { Radio } from 'antd';
import React from 'react';
import { Text } from '../../atoms';
import { Column, Flex } from '../../pages/layout';
import Card from '../card/Card';
import styles from './cardPayments.module.less';

interface ICardPaymentsProps {
  className?: string;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  image: string;
  name: string;
  description: string;
  valueRadio: string | number;
}

const CardPayments: React.FC<ICardPaymentsProps> = ({
  className,
  isSelected,
  onClick,
  valueRadio,
  image,
  name,
  description,
}) => {
  return (
    <Card
      isSelected={isSelected}
      className={`${className} ${styles.containerCardPayments}`}
      onClick={onClick}
    >
      <Flex className={styles.contentCard} alignItems='baseline'>
        <Radio value={valueRadio} />
        <Column className={styles.contentCard_texts}>
          <Text variant='bodyTitle'>{name}</Text>
          <Text>{description}</Text>
        </Column>

        <img src={image} className={styles.imageStyle} alt={`image-${name}`} />
      </Flex>
    </Card>
  );
};

export default CardPayments;
