import React, { Component } from 'react';
import './SidebarDropdown.css';

class SidebarDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty state for now
    };
  }

  render() {
  	return (
  		<div className="SidebarDropdown">
        <form className="Dropdown-form">
          <label>
            Course Name
            <input type="text" name="course_name"/>
          </label><br/>
          <label>
            Holes
            <input type="text" name="holes"/>
          </label>
        </form>
      </div>);
  }
}

export default SidebarDropdown;