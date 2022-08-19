import { Empty } from 'antd';
import React from 'react';
import { Text } from '../../atoms';
import { Button } from '../../molecules';
import { Column } from '../../pages/layout';
import styles from './emptyState.module.less';

interface IEmptyStateProps {
  className?: string;
  message: string;
  textButton: string;
  onClickButton: () => void;
}

const EmptyState: React.FC<IEmptyStateProps> = ({
  className,
  message,
  onClickButton,
  textButton,
}) => {
  return (
    <Column className={`${styles.containerNoResults} ${className}`}>
      <Empty description={<Text>{message}</Text>} />
      <Button
        style={{ marginTop: 16 }}
        text={textButton}
        onClick={onClickButton}
      />
    </Column>
  );
};

export default EmptyState;
