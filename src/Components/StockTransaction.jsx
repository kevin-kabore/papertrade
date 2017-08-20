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
    //let id = this.props.stockData.uniqueID
    let id = 1
    let quantity;
    let purchase;
    let selling;
    if (this.props.completeBuy) {
      quantity = (this.state.quantity > 0 ) ? this.state.quantity: null;
      purchase = this.props.open

    } else if(this.props.completeSale) {
      quantity = (this.state.quantity) ? this.state.quantity : null
      selling = this.props.open
    }

    let stock = {
      id: id,
      quantity: quantity,
      purchase: purchase,
      selling: selling
    }
    this.props.onStockTransaction(id, stock)
    this.setState({
      quantity: '',
      purchase: '',
      selling: ''
    })
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
                <input type='submit' value='Complete Purhase'/>
              </form>
            ) : null
        }
        {
          (this.props.completeSale) ?
            (
              <form onSubmit={this.handleTransactionSubmit}>
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
