import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

//  Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from 'Reducers';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//  main
if(document.getElementById('root')){
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={ store }>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );  
}