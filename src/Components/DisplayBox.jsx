import React, { Component } from 'react';
import axios from 'axios';

import StockList from './StockList';

class DisplayBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], portfolio: true };
    this.loadStocksFromServer = this.loadStocksFromServer.bind(this);
    // handleGetCurrent = this.bind.handleGetCurrent.bind(this);
    this.handleStockSale = this.handleStockSale.bind(this);
    this.handleStockDelete = this.handleStockDelete.bind(this);
  }
  loadStocksFromServer() {
    axios.get(this.props.url)
      .then(res => {
        console.log(res)
        this.setState({data: res.data})
      })
  }
  // handleGetCurrent(current){
  //
  // }
  handleStockSale(id, stock) {
    axios.put(`${this.props.url}/${id}`, stock)
      .catch(err => {
        console.log(err);
      })
    this.loadStocksFromServer();
  }
  handleStockDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Stock deleted');
      })
      .catch(err => {
        console.log(err)
      })
    this.loadStocksFromServer();
  }
  componentDidMount() {
    this.loadStocksFromServer();
  }
  render() {
    return (
      <div>
        <h2>Stocks:</h2>
        <StockList
          onStockSale={this.handleStockSale}
          onStockDelete={ this.handleStockDelete }
          data={ this.state.data }
          portfolio={ this.state.portfolio }
        />
      </div>
    )
  }
}

export default DisplayBox;
