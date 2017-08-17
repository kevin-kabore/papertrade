import React from 'react';
import ReactDOM from 'react-dom';
import DisplayBox from './Components/DisplayBox'
// import StockTab from './Components/StockTab'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(

  <DisplayBox
    url='http://localhost:3001/api/stocks'
    pollInterval={2500} />,
  document.getElementById('root')
);
registerServiceWorker();
