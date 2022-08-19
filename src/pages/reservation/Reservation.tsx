import React from 'react';
import { useClientStore } from '../../hooks';
import { EmptyAccount } from '../../organims';
import SearchReservations from './components/searchReservations/SearchReservations';

const Reservation: React.FC = () => {
  const { authentication } = useClientStore();
  const { user } = authentication;

  return <>{user ? <SearchReservations /> : <EmptyAccount />}</>;
};

export default Reservation;
