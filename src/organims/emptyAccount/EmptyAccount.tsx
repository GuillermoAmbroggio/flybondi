import { Empty } from 'antd';
import React, { useState } from 'react';
import { Text } from '../../atoms';
import { Button } from '../../molecules';
import { Column } from '../../pages/layout';
import LoginRegisterModal from '../loginRegisterModal/LoginRegisterModal';
import styles from './emptyAccount.module.less';

const EmptyAccount: React.FC = () => {
  const [visibleModal, setVisibleModal] = useState<{
    visible: boolean;
    option?: 'login' | 'register';
  }>({ visible: false, option: 'login' });

  const onCloseModal = () => {
    setVisibleModal({ visible: false });
  };
  return (
    <>
      {visibleModal.visible ? (
        <LoginRegisterModal
          onCloseModal={onCloseModal}
          visibleModal={visibleModal.visible}
          step={visibleModal.option ?? 'login'}
        />
      ) : null}
      <Column className={styles.containerNoResults}>
        <Empty description={<Text>No tienes una cuenta activa</Text>} />
        <Button
          style={{ marginTop: 16 }}
          text='Iniciar sesión'
          onClick={() => setVisibleModal({ visible: true })}
        />
        <Button
          type='text'
          style={{ marginTop: 16 }}
          text='Crea una cuenta'
          onClick={() => setVisibleModal({ visible: true, option: 'register' })}
        />
      </Column>
    </>
  );
};

export default EmptyAccount;
