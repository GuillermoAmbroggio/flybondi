import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.less';
import logo from '../../assets/logo.png';
import { Text } from '../../atoms';
import { NavbarAccountSection } from '../../molecules';

const Navbar: React.FC = () => {
  return (
    <div className={styles.container}>
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

      <NavbarAccountSection />
    </div>
  );
};

export default Navbar;
