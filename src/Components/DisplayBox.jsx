import React, { Component } from 'react';
import axios from 'axios';

import StockList from './StockList';


class DisplayBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], portfolio: true };
    // this.getData = this.getData.bind(this)
    this.loadStocksFromServer = this.loadStocksFromServer.bind(this);
    // this.handleStockPurchase = this.handleStockPurchase.bind(this);
    this.handleStockSale = this.handleStockSale.bind(this);
    // this.handleStockTransaction = this.handleStockTransaction.bind(this);
    this.handleStockDelete = this.handleStockDelete.bind(this);
  }
  loadStocksFromServer() {
    axios.get(this.props.url)
      .then(res => {
        console.log(res)
        this.setState({data: res.data})
      })
  }
  // handleStockPurchase(stock){
  //   let stocks = this.state.data;
  //   stock.id = Date.now();
  //   let newStocks = stocks.concat([stock])
  //   this.setState({data: newStocks});
  //   axios.post(this.props.url, stock)
  //     .catch(err => {
  //       console.log(err)
  //       this.setState({data: stocks})
  //     });
  // }
  handleStockSale(id, stock) {
    axios.put(`${this.props.url}/${id}`, stock)
      .catch(err => {
        console.log(err);
      })
  }
  handleStockDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Stock deleted');
      })
      .catch(err => {
        console.log(err)
      })
  }
  componentDidMount() {
    this.loadStocksFromServer();
    //setInterval(this.loadStocksFromServer, this.props.pollInterval)
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
