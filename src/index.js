import React from 'react';
import ReactDOM from 'react-dom';
import DisplayBox from './Components/DisplayBox';
import DisplaySearch from './Components/DisplaySearch';
// import StockTab from './Components/StockTab'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <DisplaySearch />,
  document.getElementById('displaySearch'));
ReactDOM.render(
  <DisplayBox
    url='http://localhost:3001/api/stocks' />,
  document.getElementById('displayBox')
);

registerServiceWorker();
