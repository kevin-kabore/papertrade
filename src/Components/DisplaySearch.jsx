import React, { Component } from 'react';
import axios from 'axios';
import SearchStock from './SearchStock';
import Stock from'./Stock';

const APLPHA_ADVANTAGE_API = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&apikey=XITVOZ2Q9RFEFN9D'

class DisplaySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], searched: false}
    this.handleStockSearch = this.handleStockSearch.bind(this);
    this.handleStockTransaction = this.handleStockTransaction.bind(this);
  }
  handleStockSearch(symbol) {
    console.log(symbol)
    let stocks = []
    axios.get(APLPHA_ADVANTAGE_API)
      .then(res => {
        let latestQuote = res.data['Meta Data']['3. Last Refreshed'];
        let stock = {
          symbol: res.data['Meta Data']['2. Symbol'],
          latestQuote: res.data['Meta Data']['3. Last Refreshed'],
          latestOpen: res.data['Time Series (1min)'][`${latestQuote}`]['1. open'],
          latestHigh: res.data['Time Series (1min)'][`${latestQuote}`]['2. high'],
          latestLow: res.data['Time Series (1min)'][`${latestQuote}`]['3. low'],
          latestClose: res.data['Time Series (1min)'][`${latestQuote}`]['4. close'],
          latestVolume: res.data['Time Series (1min)'][`${latestQuote}`]['5. volume']
        }
        stocks.push(stock)
        this.setState({data: stocks, searched: true})
        console.log(this.state.stock)

        // console.log(res.data['Time Series (1min)'][])
      })
  }
  handleStockTransaction(id, stock) {
    console.log('transaction for stock: ' + stock )
  }
  //add in <Stock/> passing in api data as props, and render in html
  render() {
    return(
      <div>
        <SearchStock onStockSearch={this.handleStockSearch}/>
        {
          (this.state.searched) ?
            (
              <Stock
                symbol={this.state.data[0].symbol}
                date={this.state.data[0].latestQuote}
                open={this.state.data[0].latestOpen}
                high={this.state.data[0].latestHigh}
                low={this.state.data[0].latestLow}
                close={this.state.data[0].latestClose}
                volume={this.state.data[0].latestVolume}
                onStockTransaction={this.handleStockTransaction}
              />

            ) : null
          }
      </div>
    )
  }
}

export default DisplaySearch
