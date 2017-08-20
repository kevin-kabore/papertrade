import React, {Component} from 'react';
import StockTransaction from './StockTransaction'

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeBuy: false,
      completeSale: false
    }
    this.deleteStock = this.deleteStock.bind(this);
    this.completeBuy = this.completeBuy.bind(this);
    this.completeSale = this.completeSale.bind(this);
    // this.handlePurchaseChange = this.handlePurchaseChange.bind(this);
    // this.handleSellingChange = this.handleSellingChange.bind(this);
    // this.handleQuantityChange = this.handleQuantityChange.bind(this);
    // this.handleStockTransaction = this.handleStockTransaction.bind(this);
  }
  completeBuy(e) {
    this.setState({completeBuy: !this.state.completeBuy})
  }
  completeSale(e) {
    this.setState({completeSale: !this.state.completeSale})
  }
  deleteStock(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onStockDelete(id);
    console.log('oops deleted stock')
  }
  // handlePurchaseChange(e){c
  //   this.setState({purchase: e.targetValue})
  // }
  // handleSellingChange(e){
  //   this.setState({selling: e.targetValue})
  // }
  // handleQuantityChange(e){
  //   this.setState({quantity: e.targetValue})
  // }
  // handleStockTransaction(e) {
  //   e.preventDefault();
  //   let id = this.props.uniqueID;
  //   let symbol = this.props.symbol;
  //   let date = this.props.date;
  //   let open = this.props.open;
  //   let high = this.props.high;
  //   let low = this.props.low;
  //   let close = this.props.close;
  //   let volume = this.props.volume;
  //
  //   let purchase = this.props.current;
  //   let selling = this.props.current
  //
  //   let quantity = (this.state.quantity) ? this.state.quantity : null
  //
  //   let stock = {
  //     id: id,
  //     symbol: symbol,
  //     date: date,
  //     open: open,
  //     high: high,
  //     low: low,
  //     close: close,
  //     volume: volume,
  //     purchase: purchase,
  //     selling: selling,
  //     quantity: quantity
  //   }
  //
  //   this.props.onStockTransaction(id, stock)
  //   this.setState({
  //     newTransaction: !this.state.toBeUpdated,
  //     purchase: '',
  //     quantity: '',
  //     selling: ''
  //   })
  // }

  render() {
    return (
      <div>
        <h2>{this.props.symbol}</h2>
        <p>Date: {this.props.date}</p>
        <ul>
          <li>Open: {this.props.open}</li>
          <li>High: {this.props.high}</li>
          <li>Low: {this.props.low}</li>
          <li>Close: {this.props.close}</li>
          <li>Volume: {this.props.volume}</li>
        </ul>
        <button onClick={this.completeBuy}>Buy</button>
        <button onClick={this.completeSale}>Sell</button>
        <button onClick={this.deleteStock}>Delete</button>
        {
          (this.state.completeBuy) ?
            (<StockTransaction
              open={this.props.open}
              completeBuy={this.state.completeBuy}
              onStockTransaction={this.props.onStockTransaction}
              />
            ) : null
        }
        {
          (this.state.completeSale) ?
            (<StockTransaction
              open={this.props.open}
              completeSale={this.state.completeSale}
              onStockTransaction={this.props.onStockTransaction}
            />
          ) : null
        }

      </div>
    )
  }
}

export default Stock;

// {
//   (this.state.newTransaction ) ?
//   (
//     <form onSubmit={this.handleStockTransaction}>
//       <input
//         type='number'
//         placeholder='Number of shares'
//         value={this.state.quantity}
//         onChange={this.handleQuantityChange}
//       />
//       <label>
//         Purchase price
//         <input readonly
//           type='number'
//           placeholder='Purchase Price'
//           value={this.state.current}
//           onChange={this.handlePurchaseChange}
//           />
//       </label>
//       <label> Selling price
//         <input
//           type='number'
//           placeholder='Selling Price'
//           value={this.state.selling}
//           onChange={this.handleSellingChange}
//         />
//       </label>
//
//       <input
//         type='submit'
//         value='Complete Transaction'
//       />
//     </form>
//   ) : null
// }
