import React, { Component } from 'react';
import './ButtonWrapper.css';
import { Button } from 'react-bootstrap';

class ButtonWrapper extends React.Component {
	constructor(props) {
		super(props);
		// using props to pass up the active thing
		// using props to pass value
		// props has handleChangePage
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleButtonClick(e) {
		this.props.handleChangePage(e) // lift state up to app.js
	}

	render() {
		return (
			<Button active={this.props.active}
          onClick={this.handleButtonClick} value={this.props.value}>{this.props.value}</Button>
		)
	}
}

export default ButtonWrapper;