import React, {Component} from 'react';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTransaction: false,
      // current: this.props.current,
      // open: this.props.open,
      // close: this.props.close,
      purchase: '',
      selling: '',
      quantity: ''
    }
    this.deleteStock = this.deleteStock.bind(this);
    this.completeNewTransaction = this.completeNewTransaction.bind(this);
    this.handlePurchaseChange = this.handlePurchaseChange.bind(this);
    this.handleSellingChange = this.handleSellingChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleStockTransaction = this.handleStockTransaction.bind(this);
  }
  completeNewTransaction(e) {
    e.preventDefault();
    this.setState({newTransaction: !this.state.newTransaction})
  }
  deleteStock(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onStockDelete(id);
    console.log('oops deleted stock')
  }
  handlePurchaseChange(e){
    this.setState({purchase: e.targetValue})
  }
  handleSellingChange(e){
    this.setState({selling: e.targetValue})
  }
  handleQuantityChange(e){
    this.setState({quantity: e.targetValue})
  }
  handleStockTransaction(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    let quantity = (this.state.quantity) ? this.state.quantity : null
    let purchase = (this.state.purchase) ? this.state.purchase : null
    let selling = (this.state.selling) ? this.state.selling : null
    let stock = {
      purchase: purchase,
      quantity: quantity,
      selling: selling
    }
    this.props.onStockTransaction(id, stock)
    this.setState({
      newTransaction: !this.state.toBeUpdated,
      purchase: '',
      quantity: '',
      selling: ''
    })
  }


  render() {
    return (
      <div>
        <h2>{this.props.symbol}</h2>
        <ul>
          <li>Current: {this.props.current}</li>
          <li>Open: {this.props.open}</li>
          <li>Close: {this.props.close}</li>
          <li>Purchase: {this.props.purchase}</li>
          <li>Selling: {this.props.selling}</li>
        </ul>
        <a href='#' onClick={this.handleStockTransaction}>Buy</a>
        <a href='#' onClick={this.handleStockTransaction}>Sell</a>
        <a href='#' onClick={this.deleteStock}>Delete</a>
        {
          (this.state.newTransaction ) ?
          (
            <form onSubmit={this.handleStockTransaction}>
              <input
                type='number'
                placeholder='Number of shares'
                value={this.state.quantity}
                onChange={this.handleQuantityChange}
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
          ) : null
        }

      </div>
    )
  }
}

export default Stock;
