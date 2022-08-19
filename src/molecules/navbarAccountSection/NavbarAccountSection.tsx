import { Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { useClientStore } from '../../hooks';
import { LoginRegisterModal } from '../../organims';
import Button from '../button/Button';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLogout } from '../../particules/serverStore/mutations';

const NavbarAccountSection: React.FC = () => {
  const { authentication } = useClientStore();
  const { mutate } = useLogout();
  const { user } = authentication;
  const [visibleModal, setVisibleModal] = useState<{
    visible: boolean;
    option?: 'login' | 'register';
  }>({ visible: false, option: 'login' });

  const menuItem = (
    <Menu
      items={[
        {
          key: '1',
          label: <Link to='/mi-reserva'>Mis reservas</Link>,
        },
        {
          key: '2',
          label: (
            <div
              onClick={() => {
                mutate();
              }}
            >
              Cerrar sesión
            </div>
          ),
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  const onCloseModal = () => {
    setVisibleModal({ visible: false });
  };
  return (
    <div>
      {visibleModal.visible ? (
        <LoginRegisterModal
          onCloseModal={onCloseModal}
          visibleModal={visibleModal.visible}
          step={visibleModal.option ?? 'login'}
        />
      ) : null}
      {!user ? (
        <div>
          <Button
            text='Iniciar sesión'
            type='link'
            onClick={() => setVisibleModal({ visible: true })}
          />
          <Button
            text='Registrarse'
            onClick={() =>
              setVisibleModal({ visible: true, option: 'register' })
            }
          />
        </div>
      ) : (
        <Dropdown overlay={menuItem}>
          <a onClick={(e) => e.preventDefault()}>
            <UserOutlined style={{ marginRight: 4 }} />
            Mi cuenta
          </a>
        </Dropdown>
      )}
    </div>
  );
};

export default NavbarAccountSection;
