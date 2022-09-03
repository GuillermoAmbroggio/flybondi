import React from 'react';
import styles from '../layout.module.less';

interface IColumnProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties | undefined;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
}

const Column: React.FC<IColumnProps> = ({
  children,
  className: classNameProp,
  style: stylePop,
  alignItems,
  justifyContent,
}) => {
  return (
    <div
      style={{ alignItems, justifyContent, ...stylePop }}
      className={`${styles.column} ${classNameProp}`}
    >
      {children}
    </div>
  );
};

export default Column;
