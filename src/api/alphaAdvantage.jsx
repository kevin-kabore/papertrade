import React, { Component } from 'react';
// API key
// XITVOZ2Q9RFEFN9D

import axios from 'axios';

const APLPHA_ADVANTAGE_API = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&apikey=XITVOZ2Q9RFEFN9D'


class alphaAdvantage extends Component {
  constructor() {
    super();
    this.state = {data: []}
  }
  getData(symbol) {
    var requestUrl = `${APLPHA_ADVANTAGE_API}`
    return axios.get(requestUrl).then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <div>Alpha Advantage Api loaded</div>
    )
  }
}

export default alphaAdvantage
