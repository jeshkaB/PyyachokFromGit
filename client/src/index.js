import React from 'react';
import ReactDOM from 'react-dom/client';

import {unstable_HistoryRouter as BrowserRouter} from 'react-router-dom';
import {setupStore} from './redux';
import {Provider} from 'react-redux';
import {App} from './App';
import {history} from './services';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

      <Provider store={store}>
          <BrowserRouter history={history}>
              <App/>
          </BrowserRouter>
      </Provider>

);

