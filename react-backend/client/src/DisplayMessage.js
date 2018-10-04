import React, { Component } from 'react';
import './DisplayMessage.css';

class DisplayMessage extends React.Component {
	constructor(props) {
		super(props);
		// pageNumber
		// pageSize
		// numberOfItems
	}

	render() {
		return (
			<div className="topTable">
				<b>{"TOTAL CARDS: " + this.props.numberOfItems}</b>
	          	<b>{"DISPLAYING: " + (((this.props.pageNumber-1)*this.props.pageSize) + 1)  
	          	+ "-" + ((this.props.pageNumber)*this.props.pageSize)}</b>
          	</div>
		)
	}
}

export default DisplayMessage;