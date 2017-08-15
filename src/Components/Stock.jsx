import React, {Component} from 'react';
import marked from 'marked';

class Stock extends Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString())
    return {__html: rawMarkup};
  }
  render() {
    return {
      <div>
        <h2>{this.props.symbol}</h2>
        <p>{this.props.current}</p>
        <p>{this.props.open}</p>
        <p>{this.props.close}</p>
      </div>
    }
  }
}

export default Stock;
