import React from 'react';
import styles from '../layout.module.less';
interface IFlexProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties | undefined;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
}

const Flex: React.FC<IFlexProps> = ({
  children,
  className: classNameProp,
  style: stylePop,
  alignItems,
  justifyContent,
}) => {
  return (
    <div
      style={{ alignItems, justifyContent, ...stylePop }}
      className={`${styles.flex} ${classNameProp}`}
    >
      {children}
    </div>
  );
};

export default Flex;
