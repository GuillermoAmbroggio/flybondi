import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from './particules/providers/Providers';
import 'antd/dist/antd.css';
import './antdVariables.less';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <App />
  </Providers>,
);
