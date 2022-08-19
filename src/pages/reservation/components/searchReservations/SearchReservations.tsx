import { Spin } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardReservation } from '../../../../molecules';
import { EmptyState } from '../../../../organims';
import { useSearchReservations } from '../../../../particules/serverStore/queries';
import styles from './searchReservations.module.less';

const SearchReservations: React.FC = () => {
  const { data, isLoading } = useSearchReservations();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spin size='large' />;
  }
  if (!data || (data && !data.length)) {
    return (
      <EmptyState
        message='No tienes ninguna reserva en tu cuenta'
        textButton='Busca tu vuelo ahora'
        onClickButton={() => navigate('/')}
      />
    );
  }
  return (
    <div className={styles.containerReservations}>
      {data && data.length
        ? data.map((reservation, i) => (
            <CardReservation
              key={i}
              reservationData={reservation}
              className={styles.cardReservation}
            />
          ))
        : null}
    </div>
  );
};

export default SearchReservations;
