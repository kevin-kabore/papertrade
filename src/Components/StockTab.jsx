import React, {Component} from 'react';
import SearchStock from './SearchStock'


var alphaAdvantage = require('../api/alphaAdvantage')

class StockTab extends Component {
  handleSearch(symbol) {
    alphaAdvantage.getData(symbol)
  }
  render() {
    return (
      <div>
        <h2>Search Symbol:</h2>
        <SearchStock onSearch={this.handleSearch}/>
      </div>

    )
  }
}

export default StockTab;
