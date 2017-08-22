import React, {Component} from 'react';
import StockTransaction from './StockTransaction'
import axios from 'axios';
class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeBuy: false,
      completeSale: false,
      currentDate: '',
      currentPrice: ''
    }
    this.deleteStock = this.deleteStock.bind(this);
    this.completeBuy = this.completeBuy.bind(this);
    this.completeSale = this.completeSale.bind(this);
  }
  componentDidMount(){
    let symbol = this.props.symbol
    let APLPHA_ADVANTAGE_API = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=XITVOZ2Q9RFEFN9D`
    axios.get(APLPHA_ADVANTAGE_API)
      .then(res => {
        let latestQuote = res.data['Meta Data']['3. Last Refreshed']
        let latestOpen = res.data['Time Series (1min)'][`${latestQuote}`]['1. open']
        this.setState({
          currentDate: latestQuote,
          currentPrice: latestOpen
        })
        console.log(this.state)
      })
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

                <div>
                  <h1>{this.props.symbol}</h1>
                  <p>Purchase Date: {this.props.date}</p>
                  <p>Purchase Price: {this.props.purchasePrice}</p>
                  <p>Current Date: {this.state.currentDate}</p>
                  <p>Current Price: {this.state.currentPrice}</p>
                  <ul>
                    <li>Remaining Quantity: {this.props.quantity}</li>
                    <li>Total Return: {this.props.profit}</li>
                  </ul>
                  <button onClick={this.completeSale}>Sell</button>
                  <button onClick={this.deleteStock}>Delete</button>
                </div>
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
              currentDate={this.state.currentDate}
              currentPrice={this.state.currentPrice}
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
