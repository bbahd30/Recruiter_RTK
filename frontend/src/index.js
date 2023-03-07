import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../src/Store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render
  (
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </Provider>
  );


reportWebVitals();