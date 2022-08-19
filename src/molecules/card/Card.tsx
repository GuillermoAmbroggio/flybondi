import React from 'react';
import { Card as AntdCard, CardProps } from 'antd';
import styles from './card.module.less';
interface ICardProps extends Omit<CardProps, 'className'> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties | undefined;
  isSelected?: boolean;
}

const Card: React.FC<ICardProps> = ({
  children,
  className: classNameProp,
  style: styleProp,
  isSelected = false,
  ...rest
}) => {
  const styleBorder = isSelected
    ? { borderWidth: 4, borderStyle: 'solid' }
    : undefined;

  const styleGlobal = { ...styleBorder, ...styleProp };

  return (
    <div
      className={`${styles.containerCard} ${classNameProp}`}
      style={styleGlobal}
    >
      <AntdCard {...rest}>{children}</AntdCard>
    </div>
  );
};

export default Card;
