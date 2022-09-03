import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.less';
import logo from '../../assets/logo.png';
import { Text } from '../../atoms';
import { NavbarAccountSection } from '../../molecules';
import { Button, Drawer } from 'antd';
import {
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Column } from '../../pages/layout';
import { useClientStore } from '../../hooks';
import LoginRegisterModal from '../loginRegisterModal/LoginRegisterModal';
import { useLogout } from '../../particules/serverStore/mutations';

const Navbar: React.FC = () => {
  const { mutate } = useLogout();
  const { authentication } = useClientStore();
  const { user } = authentication;
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState<{
    visible: boolean;
    option?: 'login' | 'register';
  }>({ visible: false, option: 'login' });

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onCloseModal = () => {
    setVisibleModal({ visible: false });
  };

  return (
    <div className={styles.container}>
      {visibleModal.visible ? (
        <LoginRegisterModal
          onCloseModal={onCloseModal}
          visibleModal={visibleModal.visible}
          step={visibleModal.option ?? 'login'}
        />
      ) : null}
      <Link style={{ marginLeft: 0 }} to='/'>
        <img src={logo} className={styles.logo} alt='logo' />
      </Link>

      <div className={styles.containerLink}>
        <Link to='/' className={styles.link}>
          <Text variant='title' className={styles.link}>
            Inicio
          </Text>
        </Link>
        <Link to='/mi-reserva' className={styles.link}>
          <Text variant='title' className={styles.link}>
            Mis reservas
          </Text>
        </Link>
      </div>

      <div className={styles.containerLink}>
        <NavbarAccountSection />{' '}
      </div>

      <div className={styles.drawer}>
        <Button
          type='primary'
          onClick={showDrawer}
          style={{ marginBottom: 16 }}
        >
          {visible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      {visible ? (
        <Drawer
          title='Menú'
          placement='left'
          onClose={onClose}
          visible={visible}
          width={'75%'}
          className={styles.drawer}
        >
          <div className={styles.contentDrawer}>
            <Column>
              <Link to='/' className={styles.linkDrawerContainer}>
                <HomeOutlined style={{ marginRight: 10 }} />
                <Text variant='title' className={styles.linkDrawer}>
                  Inicio
                </Text>
              </Link>
              <Link to='/mi-reserva' className={styles.linkDrawerContainer}>
                <DatabaseOutlined style={{ marginRight: 10 }} />

                <Text variant='title' className={styles.linkDrawer}>
                  Mis reservas
                </Text>
              </Link>
            </Column>
            <div className={styles.containerAccount}>
              {user ? (
                <Text
                  onClick={() => {
                    mutate();
                  }}
                  variant='title'
                  className={styles.linkDrawerUnderline}
                >
                  Cerrar sesión
                </Text>
              ) : (
                <div>
                  <Text
                    onClick={() => setVisibleModal({ visible: true })}
                    variant='title'
                    className={styles.linkDrawerUnderline}
                  >
                    Iniciar sesión
                  </Text>

                  <Text
                    onClick={() =>
                      setVisibleModal({ visible: true, option: 'register' })
                    }
                    variant='title'
                    className={styles.linkDrawerUnderline}
                  >
                    Registrarse
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Drawer>
      ) : null}
    </div>
  );
};

export default Navbar;
