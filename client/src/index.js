import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter} from "react-router-dom";
import {setupStore} from './redux'
import {Provider} from "react-redux";
import {App} from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = setupStore();

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

