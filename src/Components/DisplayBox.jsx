import React, { Component } from 'react';
import axios from 'axios';

import StockList from './StockList';


class DisplayBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    // this.getData = this.getData.bind(this)
    this.loadStocksFromServer = this.loadStocksFromServer.bind(this);
    this.handleStockSubmit = this.handleStockSubmit.bind(this);
    this.handleStockTransaction = this.handleStockTransaction.bind(this);
    this.handleStockDelete = this.handleStockDelete.bind(this);
  }
  loadStocksFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({data: res.data})
      })
  }
  handleStockSubmit(stock){
    // handle post
    let stocks = this.state.data;
    stock.id = Date.now();
    let newStocks = stocks.concat([stock])
    this.setState({data: newStocks});
    axios.post(this.props.url, stock)
      .catch(err => {
        console.log(err)
        this.setState({data: stocks})
      });
  }
  handleStockTransaction(id, stock) {
    // Handle transaction to db
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
          onStockTransaction={this.handleStockTransaction}
          onStockDelete={ this.handleStockDelete }
          data={ this.state.data }
        />
      </div>
    )
  }
}

export default DisplayBox;
