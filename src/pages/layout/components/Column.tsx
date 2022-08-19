import React from 'react';
import styles from '../layout.module.less';

interface IColumnProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties | undefined;
}

const Column: React.FC<IColumnProps> = ({
  children,
  className: classNameProp,
  style: stylePop,
}) => {
  return (
    <div style={stylePop} className={`${styles.column} ${classNameProp}`}>
      {children}
    </div>
  );
};

export default Column;
