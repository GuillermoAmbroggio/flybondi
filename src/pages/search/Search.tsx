import { Checkbox, message, Pagination } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Text } from '../../atoms';
import { useClientStore } from '../../hooks';
import { Button, CardSummary, CardTrip, GoBackButton } from '../../molecules';
import { EmptyState } from '../../organims';
import { useSearchTrips } from '../../particules/serverStore/queries';
import { ParamsSearch } from '../../particules/serverStore/request/trips/getTrips';
import { Column, Flex } from '../layout';
import SearchFilters from './components/searchFilters/SearchFilters';
import SearchModalConfirmation from './components/searchModalConfirmation/SearchModalConfirmation';
import styles from './search.module.less';

type LocationSearch = {
  price_max: number;
  price_min: number;
  passengers: number;
  city_from: string;
  city_to: string;
};

const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (location && !location.state) {
    return (
      <EmptyState
        message='No se encontraron resultados para tu búsqueda'
        textButton='Cambiar búsqueda'
        onClickButton={() => navigate('/')}
      />
    );
  }
  const { dispatch, tripSummary } = useClientStore();
  const [steps, setSteps] = useState<'origin' | 'destination'>('origin');
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const requiredDestination = tripSummary.destination !== null;

  const { passengers, price_max, price_min, city_from, city_to } =
    location.state as LocationSearch;

  const [paramsSelected, setParamsSelected] = useState<ParamsSearch>({
    page: 1,
    city_from,
    city_to,
    passengers,
    price_max,
    price_min,
  });
  const { data, refetch } = useSearchTrips({
    passengers: paramsSelected.passengers,
    price_max: paramsSelected.price_max,
    price_min: paramsSelected.price_min,
    page: paramsSelected.page,
    city_from: paramsSelected.city_from,
    city_to: paramsSelected.city_to,
    sort: paramsSelected.sort,
  });

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      dispatch({ type: 'SET_DESTINATION_TRIP', payload: null });
    } else {
      dispatch({ type: 'SET_DESTINATION_TRIP', payload: undefined });
    }
  };

  const handleGoBack = async () => {
    if (steps === 'destination') {
      await setParamsSelected((old) => ({
        ...old,
        city_from,
        city_to,
      }));
      setSteps('origin');
      await refetch();
    }
  };

  const handleSubmit = async () => {
    if (!tripSummary.origin) {
      message.warning(
        'Es necesario seleccionar un vuelo de ida para continuar',
      );
      return;
    }

    if (tripSummary.origin && steps === 'origin') {
      await setParamsSelected((old) => ({
        ...old,
        city_from: tripSummary.origin?.destination,
        city_to: tripSummary.origin?.origin,
        date_since: tripSummary.origin?.data,
        sort: { by: 'data', type: 'ASC' },
      }));
      setSteps('destination');

      await refetch();
      return;
    }

    if (tripSummary.origin && tripSummary.destination === undefined) {
      message.warning(
        'Es necesario seleccionar un vuelo de regreso o marcar que no lo necesita para continuar',
      );
      return;
    }

    if (
      tripSummary.origin &&
      (tripSummary.destination || tripSummary.destination === null) &&
      steps === 'destination'
    ) {
      setVisibleModal(true);
    }
  };

  const startAgain = async () => {
    await setParamsSelected({
      page: 1,
      city_from,
      city_to,
      passengers,
      price_max,
      price_min,
    });
    await setSteps('origin');
    await refetch();
  };

  useEffect(() => {
    if (!tripSummary.origin) {
      startAgain();
    }
  }, [tripSummary.origin]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'CLEAN_TRIP' });
    };
  }, []);

  return (
    <div className={styles.container}>
      {visibleModal ? (
        <SearchModalConfirmation
          onCloseModal={onCloseModal}
          visibleModal={visibleModal}
          passengers={Number(paramsSelected.passengers)}
        />
      ) : null}
      {visibleDrawer ? (
        <SearchFilters
          visibleDrawer={visibleDrawer}
          onCloseDrawer={onCloseDrawer}
          paramsSelected={paramsSelected}
          setParamsSelected={setParamsSelected}
          refetch={refetch}
          steps={steps}
        />
      ) : null}
      {data && data?.count ? (
        <Flex justifyContent='space-around'>
          <Column className={styles.containersCountries}>
            <Flex alignItems='center'>
              {steps !== 'origin' ? (
                <GoBackButton onClick={() => handleGoBack()} />
              ) : null}
              <Text variant='titleBig'>
                Elige tu vuelo de {steps === 'origin' ? 'ida' : 'regreso'}:
              </Text>
            </Flex>

            <Flex alignItems='center'>
              <Pagination
                current={Number(paramsSelected.page)}
                total={data?.count}
                showSizeChanger={false}
                onChange={(page) => {
                  setParamsSelected((old) => ({ ...old, page }));
                  refetch();
                }}
                style={{ marginBottom: 16, marginTop: 16, marginRight: 16 }}
              />
              <Button
                text='Filtrar'
                type='dashed'
                onClick={showDrawer}
                style={{ width: 100 }}
              />
            </Flex>
            <Column>
              {steps === 'destination' ? (
                <Checkbox
                  onChange={onChangeCheckbox}
                  className={styles.checkboxStyle}
                >
                  No necesito pasaje de regreso
                </Checkbox>
              ) : null}
              {requiredDestination &&
                data.results.map((e, i) => {
                  return (
                    <CardTrip
                      tripData={e}
                      key={i}
                      className={styles.cardTrip}
                      isSelected={tripSummary[steps]?.id === e.id}
                      onClick={() => {
                        if (steps === 'origin') {
                          dispatch({ type: 'SET_ORIGIN_TRIP', payload: e });
                        }

                        if (steps === 'destination') {
                          dispatch({
                            type: 'SET_DESTINATION_TRIP',
                            payload: e,
                          });
                        }
                      }}
                    />
                  );
                })}
            </Column>
          </Column>
          <CardSummary
            steps={steps}
            handleSubmit={handleSubmit}
            passengers={Number(paramsSelected.passengers)}
          />
        </Flex>
      ) : (
        <EmptyState
          message='No se encontraron resultados para tu búsqueda'
          textButton='Cambiar búsqueda'
          onClickButton={() => navigate('/')}
        />
      )}
    </div>
  );
};

export default Search;
