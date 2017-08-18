import React, { Component } from 'react';
import axios from 'axios';
import SearchStock from './SearchStock';
import Stock from'./Stock';

const APLPHA_ADVANTAGE_API = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&apikey=XITVOZ2Q9RFEFN9D'

class DisplaySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {stock: [], searched: false}
    this.handleStockSearch = this.handleStockSearch.bind(this);
  }
  handleStockSearch(symbol){
    console.log(symbol)
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

        this.setState({stock: stock, searched: true})
        console.log(this.state.stock)

        // console.log(res.data['Time Series (1min)'][])
      })
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
                symbol={this.state.stock.symbol}
                date={this.state.stock.latestQuote}
                open={this.state.stock.latestOpen}
                high={this.state.stock.latestHigh}
                low={this.state.stock.latestLow}
                close={this.state.stock.latestClose}
                volume={this.state.stock.latestVolume}
              />
            ) : null
          }
      </div>
    )
  }
}

export default DisplaySearch
