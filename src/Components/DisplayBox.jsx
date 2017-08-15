import React, {Component} from 'react';
import StockList from './StockList';
import Stock from './Stock.jsx';

import DATA from '../data';

class DisplayBox extends Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
  }
  render() {
    return (
      <div>
        <h2>Stock Info</h2>
        <StockList data={DATA}/>
      </div>
    )
  }
}

export default DisplayBox;
