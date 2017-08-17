import React, {Component} from 'react';
import Stock from './Stock'

class StockList extends Component {
  render() {
    let stockNodes = this.props.data.map(stock => {
      return (
        <Stock
          uniqueID={stock['_id']}
          symbol={stock.symbol}
          current={stock.current}
          open={stock.open}
          close={stock.close}
          purchase={stock.purchase}
          selling={stock.selling}
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
