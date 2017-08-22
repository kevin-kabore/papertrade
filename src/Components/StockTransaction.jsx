import React, { Component } from 'react';

class StockTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      purchasePrice: '',
      sellingPrice: ''
    };
    this.deleteStock = this.deleteStock.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handlePurchaseChange = this.handlePurchaseChange.bind(this);
    this.handleSellingChange = this.handleSellingChange.bind(this);
    this.handlePurchaseSubmit = this.handlePurchaseSubmit.bind(this);
    this.handleSaleSubmit = this.handleSaleSubmit.bind(this);
    //this.handleTransactionSubmit = this.handleTransactionSubmit.bind(this);
  }
  deleteStock(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onStockDelete(id);
    console.log('oops deleted stock')
  }
  handleQuantityChange(e) {
    this.setState({quantity: e.target.value})
  }
  handlePurchaseChange(e) {
    this.setState({purchasePrice: e.target.value})
  }
  handleSellingChange(e) {
    this.setState({sellingPrice: e.target.value})
  }
  handlePurchaseSubmit(e) {
    e.preventDefault();
    let quantity = (this.state.quantity > 0 ) ? this.state.quantity: null;
    let purchasePrice = this.props.open
    let stock = {
      quantity: quantity,
      date: this.props.date,
      symbol: this.props.symbol,
      open: this.props.open,
      purchasePrice: purchasePrice,
      profit: 0 
    }
    this.props.onStockPurchase(stock)
    console.log(`Purchased ${stock.quantity} ${stock.symbol} stocks at ${stock.purchasePrice} dollars.`)

    this.setState({
      quantity: '',
      purchasePrice: '',
    })
  }
  handleSaleSubmit(e) {
    e.preventDefault();
    let quantity = (this.state.quantity > 0 && this.state.quantity <= this.props.quantity) ? this.state.quantity : null;

    //req to api url to get current price?
    let sellingPrice = this.props.open;

    let remainingQuantity = this.props.quantity - quantity;
    let profit =  (quantity * sellingPrice) - (quantity * 1000);
    console.log('Profit = ' + profit)
    //profit = (this.props.)
    let stock = {
      id: this.props.uniqueID,
      date: this.props.date,
      quantity: remainingQuantity,
      profit: profit
      // sellingPrice: sellingPrice
    }
    this.props.onStockSale(stock.id, stock);

    console.log(`Sold ${quantity} at ${sellingPrice} price. You have ${stock.quantity} ${this.props.symbol} stocks remaining.`)
    this.setState({
      quantity: '',
      sellingPrice: ''
    })
  }
  render() {
    return (
      <div>
        {
          (this.props.completeBuy) ?
            (
              <form onSubmit={this.handlePurchaseSubmit}>
                <input type='number' placeholder='Quantity' value={this.state.quantity} onChange={this.handleQuantityChange}/>
                <input type='number' value={this.props.open} onChange={this.handlePurchaseChange}/>
                <input type='submit' value='Complete Purhase'/>
              </form>
            ) : null
        }
        {
          (this.props.completeSale) ?
            (
              <form onSubmit={this.handleSaleSubmit}>
                <input type='number' placeholder='Quantity' value={this.state.quantity} onChange={this.handleQuantityChange}/>
                <input type='number' value={this.props.open} onChange={this.handleSellingChange}/>
                <input type='submit' value='Complete Sale'/>
              </form>
            ) : null
        }
      </div>
    )
  }

}

export default StockTransaction;
