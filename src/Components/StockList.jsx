import React, {Component} from 'react';
import Stock from './Stock'

class StockList extends Component {
  render() {
    let stockNodes = this.props.data.map(stock => {
      return (
        <Stock key={stock.id}>
          <p>{stock.symbol}</p>
          <p>{stock.current}</p>
          <p>{stock.open}</p>
          <p>{stock.close}</p>
        </Stock>
      )
    })
    return (
      <div>
        {stockNodes}
      </div>
    )
  }
}

export default StockList;
