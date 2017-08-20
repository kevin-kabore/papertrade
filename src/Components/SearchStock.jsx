import React, { Component } from 'react';

class SearchStock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchSymbol: ''
    }
    this.handleStockSearch = this.handleStockSearch.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }
  handleSearchChange(e){
    this.setState({searchSymbol: e.target.value})
  }
  handleStockSearch(e){
    e.preventDefault()
    this.props.onStockSearch(this.state.searchSymbol)
  }
  // componentDidMount(){
  //   this.getStockFromApi();
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.handleStockSearch}>
          <input
            type='text'
            value={this.state.searchSymbol}
            onChange={this.handleSearchChange}
            placeholder='Stock Symbol'/>

          <input type="submit" value="Get Stock Data" />
        </form>
      </div>
    )
  }
}

export default SearchStock;
