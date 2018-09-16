import React, { Component } from 'react';
import './Table.css';

// child components
import TableRow from './TableRow';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty state for now
    };
  }

  render() {
    // hardcoding this array for now, getting this passed down as a prop later...
    // would then use it as this.props.data.map(data => ...)
    var data = ["row1", "row2", "row3", "row4", "row5", "row6"];

  	return (
  		<div className="Table">
        	<b>Table</b>
          <div className="golfCards">
            {data.map(x => (
              <TableRow data={x}/>
            ))}
          </div>
      </div>
    );
  }
}

export default Table;