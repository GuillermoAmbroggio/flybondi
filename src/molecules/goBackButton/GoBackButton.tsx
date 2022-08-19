import React from 'react';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './goBackButton.module.less';

interface IGoBackButtonProps {
  onClick?: () => void;
}

const GoBackButton: React.FC<IGoBackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <LeftCircleOutlined
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          navigate(-1);
        }
      }}
      className={styles.icon}
    />
  );
};

export default GoBackButton;
