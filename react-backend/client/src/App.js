import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Child components
import SidebarOption from './SidebarOption';
import Table from './Table';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // no state right now
      // add state for button that sets number of table entries showing, pass to table
    };
  }

  // NOTES
  // implement animation to show dropdown of options for certain elements
  // after selecting dropdown of options, lift up state to sidebaroption, then to app, then drop down to table, then drop to
  //    tablerow
  // have a static prop for certain options: upload, save to desktop..., so then can know that nothing happens when clicked
  // upload -> use uncontrolled component, must cause it's a file upload
  render() {
    return (
      <div className="App">
        <div className="sidenav">
          <SidebarOption text={"Input/Find"}/>
          <SidebarOption text={"Sort"}/>
          <SidebarOption text={"Upload"}/>
          <SidebarOption text={"Save to Desktop"}/>
        </div>
        <Table/>
      </div>
    );
  }
}

export default App;