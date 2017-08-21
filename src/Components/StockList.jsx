import React, {Component} from 'react';
import Stock from './Stock'

class StockList extends Component {
  render() {
    let stockNodes = this.props.data.map(stock => {
      return (
        <Stock
          uniqueID={stock['_id']}
          portfolio={this.props.portfolio}
          symbol={stock.symbol}
          date={stock.date}
          open={stock.open}
          quantity={stock.quantity}
          purchasePrice={stock.purchasePrice}
          profit={this.profit}
          onStockSale={this.props.onStockSale}
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
