import React from 'react';
import { TextProps } from './text.types';
import styles from './text.module.less';

const Text: React.FC<TextProps> = ({
  children,
  color = 'primary',
  variant = 'body',
  className,
  style: styleProp,
  onClick,
}) => {
  return (
    <p
      className={`${styles.text} 
              ${styles[`text__${color}`]}
              ${styles[`text__${variant}`]} ${className}`}
      style={styleProp}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default Text;
