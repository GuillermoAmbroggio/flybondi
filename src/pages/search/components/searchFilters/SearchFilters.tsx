import React from 'react';
import { Drawer, Radio, RadioChangeEvent } from 'antd';
import { Text } from '../../../../atoms';
import { Button } from '../../../../molecules';
import { ParamsSearch } from '../../../../particules/serverStore/request/trips/getTrips';
import { Column } from '../../../layout';

interface ISearchFiltersProps {
  onCloseDrawer: () => void;
  visibleDrawer: boolean;
  paramsSelected: ParamsSearch;
  setParamsSelected: React.Dispatch<React.SetStateAction<ParamsSearch>>;
  refetch: () => void;
  steps: 'origin' | 'destination';
}

const SearchFilters: React.FC<ISearchFiltersProps> = ({
  onCloseDrawer,
  visibleDrawer,
  paramsSelected,
  setParamsSelected,
  refetch,
  steps,
}) => {
  const onChange = (e: RadioChangeEvent) => {
    setParamsSelected((old) => ({
      ...old,
      sort: { by: 'price', type: e.target.value },
    }));
  };

  const onChangeData = (e: RadioChangeEvent) => {
    setParamsSelected((old) => ({
      ...old,
      sort: { by: 'data', type: e.target.value },
    }));
  };
  return (
    <Drawer
      title='Flitrar vuelos'
      placement='right'
      onClose={onCloseDrawer}
      visible={visibleDrawer}
    >
      <Column>
        <Column>
          <Text style={{ display: 'block' }}>Filtrar por precio:</Text>
          <Radio.Group
            onChange={onChange}
            value={
              paramsSelected.sort?.by === 'price'
                ? paramsSelected.sort?.type
                : undefined
            }
          >
            <Column>
              <Radio value={'ASC'}>Menor a mayor</Radio>
              <Radio value={'DESC'}>Mayor a menor</Radio>
            </Column>
          </Radio.Group>
        </Column>
        {steps !== 'origin' ? (
          <Column style={{ marginTop: 24 }}>
            <Text style={{ display: 'block' }}>Filtrar por fecha:</Text>
            <Radio.Group
              onChange={onChangeData}
              value={
                paramsSelected.sort?.by === 'data'
                  ? paramsSelected.sort?.type
                  : undefined
              }
            >
              <Column>
                <Radio value={'ASC'}>Proximos vuelos</Radio>
              </Column>
            </Radio.Group>
          </Column>
        ) : null}
        <Button
          style={{ marginTop: 24 }}
          text='Aplicar filtros'
          onClick={async () => await refetch()}
        />
      </Column>
    </Drawer>
  );
};

export default SearchFilters;
