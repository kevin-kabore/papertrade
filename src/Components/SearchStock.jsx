import React, { Component } from 'react';

class SearchStock extends Component {
  onFormSubmit(e) {
    e.preventDefault();

    let stockSymbol = this.refs.stockSymbol.value;
    if (stockSymbol.length > 0) {
      this.refs.stockSymbol.value = ''
      this.props.onSearch(stockSymbol);
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="search" ref="stockSymbol" placeholder="SearchStock"/>
          <input type='submit' value='Submit'>Get Stock Data</input>
        </form>
      </div>
    )
  }
}

export default SearchStock;
