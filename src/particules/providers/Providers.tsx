import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactQueryProvider from './reactQueryProvider/ReactQueryProvider';

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ReactQueryProvider>
  );
};

export default Providers;
