import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Home, Layout, Reservation, Search } from './pages';
import { useCachedResources } from './hooks';
import './utils/axiosConfig/axiosConfig';

const App = () => {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return <h1>Cargando...</h1>;
  }
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route key={1} path={'/mi-reserva'} element={<Outlet />}>
          <Route key={'index-1'} index element={<Reservation />} />
        </Route>

        <Route path='*' element={<p>No hay resultados para tu busqueda</p>} />
      </Route>
      <Route path='/buscador' element={<Layout isSearch />}>
        <Route index element={<Search />} />
        <Route path='*' element={<p>No hay resultados para tu busqueda</p>} />
      </Route>
    </Routes>
  );
};

export default App;
