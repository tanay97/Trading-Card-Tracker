import React, { Component } from 'react';
import './SidebarOption.css';

import SidebarDropdown from './SidebarDropdown';

class SidebarOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty state for now
      clicked: false
    };
    this.handleClick =this.handleClick.bind(this);// bind the function
  }
  handleClick(e) {
    //console.log('urmomgay');
    this.setState(state => ({clicked: !state.clicked}));
    //console.log(this.state.clicked); 
    //this.render(); 
  }

  render() {
    if (this.state.clicked === true && this.props.type == 1){
      return (
      <div>
        <div className="SidebarOption" onClick={this.handleClick}>
            <p className="SidebarOption-p">
                {this.props.text}
            </p>
        </div>
        <SidebarDropdown text={"Menu"}/>
      </div>
      );
    }
    else{
      return (
        <div className="SidebarOption" onClick={this.handleClick}>
          <p className="SidebarOption-p">
              {this.props.text}
          </p>
        </div>);
      }
    }	
  }

export default SidebarOption;