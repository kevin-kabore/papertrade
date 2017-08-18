import React, { Component } from 'react';
import axios from 'axios';
import SearchStock from './SearchStock';
import Stock from'./Stock';

const APLPHA_ADVANTAGE_API = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&apikey=XITVOZ2Q9RFEFN9D'

class DisplaySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []}
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
            lastestOpen: res.data['Time Series (1min)'][`${latestQuote}`]['1. open'],
            latestHigh: res.data['Time Series (1min)'][`${latestQuote}`]['2. high'],
            latestLow: res.data['Time Series (1min)'][`${latestQuote}`]['3. low'],
            latestClose: res.data['Time Series (1min)'][`${latestQuote}`]['4. close'],
            latestVolume: res.data['Time Series (1min)'][`${latestQuote}`]['5. volume']
        }

        this.setState({data: stock})
        console.log(this.state.data)

        // console.log(res.data['Time Series (1min)'][])
      })
  }
  render() {
    return(
      <div>
        <SearchStock onStockSearch={this.handleStockSearch}/>
        <Stock />
        <ul>
          <li>Symbol: {this.state.data.symbol}</li>
          <li>Latest Quote: {this.state.data.latestQuote}</li>
          <li>Open: {this.state.data.lastestOpen}</li>
          <li>High: {this.state.data.latestHigh}</li>
          <li>Low: {this.state.data.latestLow}</li>
          <li>Close: {this.state.data.latestClose}</li>
          <li>Volume: {this.state.data.latestVolume}</li>
        </ul>
      </div>
    )
  }
}

export default DisplaySearch
