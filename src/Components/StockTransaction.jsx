import React, { Component } from 'react';

class StockTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      purchase: '',
      selling: ''
    };
    this.deleteStock = this.deleteStock.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handlePurchaseChange = this.handlePurchaseChange.bind(this);
    this.handleSellingChange = this.handleSellingChange.bind(this);
    this.handleTransactionSubmit = this.handleTransactionSubmit.bind(this);
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
    this.setState({purchase: e.target.value})
  }
  handleSellingChange(e) {
    this.setState({selling: e.target.value})
  }
  handleTransactionSubmit(e) {
    e.preventDefault()
    let id = this.props.stock.uniqueID
    let quantity = (this.state.quantity) ? this.state.quantity: null;
    let purchase = (this.state.purchase) ? this.state.purchase : null;
    let selling = (this.state.selling) ? this.state.selling : null;

    let stock = {
      id: id,
      quantity: quantity,
      purchase: purchase,
      selling: selling
    }
    this.props.onStockTransaction(id, stock)
    console.log(`Purchased ${stock.quantity} at ${stock.purchase} price.`)
    console.log(`Sold ${stock.quantity} at ${stock.selling} price.`)
  }
  render() {
    return (
      <div>
        {
          (this.props.completeBuy) ?
            (
              <form onSubmit={this.handleTransactionSubmit}>
                <input type='number' placeholder='Quantity' value={this.state.quantity} onChange={this.handleQuantityChange}/>
                <input type='number' value={this.props.open} onChange={this.handlePurchaseChange}/>
              </form>
            ) : null
        }
        {
          (this.props.completeSale) ?
            (
              <form onSubmit={this.handleTransactionSubmit}>
                <input type='number' placeholder='Quantity' value={this.state.quantity} onChange={this.handleQuantityChange}/>
                <input type='number' value={this.props.open} onChange={this.handleSellingChange}/>
              </form>
            ) : null
        }
      </div>
    )
  }

}

export default StockTransaction;
