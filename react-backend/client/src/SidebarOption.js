import React, { Component } from 'react';
import './SidebarOption.css';

class SidebarOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty state for now
    };
  }

  render() {
  	return (
  		<div className="SidebarOption">
        	<p className="SidebarOption-p">
          		{this.props.text}
        	</p>
      	</div>);
  }
}

export default SidebarOption;