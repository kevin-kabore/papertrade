import React, {Component} from 'react';
import StockTransaction from './StockTransaction'

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeBuy: false,
      completeSale: false
    }
    this.deleteStock = this.deleteStock.bind(this);
    this.completeBuy = this.completeBuy.bind(this);
    this.completeSale = this.completeSale.bind(this);
  }
  completeBuy(e) {
    this.setState({completeBuy: !this.state.completeBuy})
  }
  completeSale(e) {
    this.setState({completeSale: !this.state.completeSale})
  }
  deleteStock(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onStockDelete(id);
    console.log('oops deleted stock')
  }

  render() {
    return (

      <div>
        {
          (this.props.searched) ?
            (
              <div>
                <h2>{this.props.symbol}</h2>
                <p>Date: {this.props.date}</p>
                <ul>
                  <li>Open: {this.props.open}</li>
                  <li>High: {this.props.high}</li>
                  <li>Low: {this.props.low}</li>
                  <li>Close: {this.props.close}</li>
                  <li>Volume: {this.props.volume}</li>
                </ul>
                <button onClick={this.completeBuy}>Buy</button>
              </div>
            ) : null
        }
        {
          (this.props.portfolio) ?
            (
              <div>
                <h1>{this.props.symbol}</h1>
                <p>Purchase Date: {this.props.date}</p>
                <ul>
                  <li>Quantity: {this.props.quantity}</li>
                  <li>Purchase Price: {this.props.purchasePrice}</li>
                  <li>Profit: {this.props.profit}</li>
                </ul>
                <button onClick={this.completeSale}>Sell</button>
                <button onClick={this.deleteStock}>Delete</button>
              </div>
            ) : null
        }
        {
          (this.state.completeBuy) ?
            (<StockTransaction
              symbol={this.props.symbol}
              date={this.props.date}
              open={this.props.open}
              completeBuy={this.state.completeBuy}
              onStockPurchase={this.props.onStockPurchase}
              />
            ) : null
        }
        {
          (this.state.completeSale) ?
            (<StockTransaction
              uniqueID={this.props.uniqueID}
              open={this.props.open}
              symbol={this.props.symbol}
              quantity={this.props.quantity}
              purchasePrice={this.props.purchasePrice}
              completeSale={this.state.completeSale}
              onStockSale={this.props.onStockSale}
            />
          ) : null
        }

      </div>
    )
  }
}

export default Stock;
