import React from 'react';
import styles from './headerSearch.module.less';
import logo from '../../assets/logo.png';
import { Text } from '../../atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { Column, Flex } from '../../pages/layout';
import { Tag } from 'antd';
import { TValuesCity } from '../../pages/home/home.validate';
import { UserOutlined } from '@ant-design/icons';

type LocationState = TValuesCity;

const HeaderSearch: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img
        src={logo}
        className={styles.logo}
        alt='logo'
        onClick={() => navigate(-1)}
      />
      <Flex className={styles.containerSearch}>
        <Text variant='body'>Tu búsqueda</Text>
        {locationState ? (
          <Flex className={styles.containerTags}>
            {locationState.city_from ? (
              <Tag color='gold'>{locationState.city_from}</Tag>
            ) : null}
            {locationState.city_to ? (
              <>
                <Text>{'>'}</Text>
                <Tag style={{ marginLeft: 8 }} color='gold'>
                  {locationState.city_to}
                </Tag>{' '}
              </>
            ) : null}
            <Tag
              style={{ marginLeft: 16 }}
              icon={<UserOutlined />}
              color='gold'
            >
              {locationState.passengers}
            </Tag>
          </Flex>
        ) : null}
      </Flex>
    </div>
  );
};

export default HeaderSearch;
