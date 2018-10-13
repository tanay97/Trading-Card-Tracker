import React, { Component } from 'react';
import './TableRow.css';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty state for now
    };
  }

  render() {
  	return (
  		<div className="TableRow">
        <p>{this.props.data}</p>
      </div>
    );
  }
}

export default TableRow;