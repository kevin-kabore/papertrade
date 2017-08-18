import React, {Component} from 'react';
import Stock from './Stock'

class StockList extends Component {
  render() {
    let stockNodes = this.props.data.map(stock => {
      return (
        <Stock
          uniqueID={stock['_id']}
          symbol={stock.symbol}
          date={stock.date}
          open={stock.open}
          high={stock.high}
          low={stock.low}
          close={stock.close}
          volume={stock.volume}
          quantity={stock.quantity}
          onStockTransaction={this.props.onStockTransaction}
          onStockDelete={this.props.onStockDelete}
          key={stock['_id']}>
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
