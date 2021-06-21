import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import 'antd/dist/antd.less';
import './index.css';

//  Redux
import { Provider } from 'react-redux';
import store from 'ReduxConfig/Store';

//  main
if(document.getElementById('root')){
  ReactDOM.render(
      <Provider store={ store }>
        <App />
      </Provider>,
    document.getElementById('root')
  );  
}