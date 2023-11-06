import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const isProduction = process.env.NODE_ENV === 'production';

ReactDOM.createRoot(document.getElementById('root')!).render(
  isProduction ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  ),
);
