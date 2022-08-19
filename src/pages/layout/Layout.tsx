import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderSearch, Navbar } from '../../organims';
import styles from './layout.module.less';

interface ILayoutProps {
  isSearch?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ isSearch }) => {
  return (
    <div className={styles.containerLayout}>
      <nav>{isSearch ? <HeaderSearch /> : <Navbar />}</nav>
      <Outlet />
    </div>
  );
};

export default Layout;
