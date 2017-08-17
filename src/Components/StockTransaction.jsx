import React, { Component } from 'react';

class StockTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: '', purchase: '', selling: ''};
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handlePurchaseChange = this.handlePurchaseChange.bind(this);
    this.handleSellingChange = this.handleSellingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleSubmit(e) {
    e.preventDefault();
    let quantity = this.state.quantity.trim()
    let purchase = this.state.purchase.trim()
    let selling = this.state.selling.trim()

    this.props.onTransactionSubmit({quantity: quantity, purchase: purchase, selling: selling})
    this.setState({quantity: '', purchase: '', selling: ''})
    console.log(`Bought ${this.state.quantity} shares at ${this.state.purchase} and sold at ${this.state.selling}`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='number'
          placeholder='Number of shares'
          value='{this.state.quantity}'
        />
        <input
          type='number'
          placeholder='Purchase Price'
          value={this.state.purchase}
          onChange={this.handlePurchaseChange}
        />
        <input
          type='number'
          placeholder='Selling Price'
          value={this.state.selling}
          onChange={this.handleSellingChange}
        />
        <input
          type='submit'
          value='Complete Transaction'
        />
      </form>
    )
  }
}

export default StockTransaction;
