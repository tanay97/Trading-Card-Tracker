import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ButtonWrapper from './ButtonWrapper.js';

// Child components
import SidebarOption from './SidebarOption';
import Table from './Table';
import DisplayMessage from './DisplayMessage';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

var request = require("request");

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,  // should never change
      buttonPageIndex: 0,  // should never change
      pageSize: 9,   // todo: make button saying what pageSize is
      numberButtons: 2,  // todo: change based on screen size
      data: null
    };
    this.handleChangePage=this.handleChangePage.bind(this);
    this.handleNewData = this.handleNewData.bind(this);
    this.handleInitialData = this.handleInitialData.bind(this);
    this.handleInitialData();
  }

  handleInitialData() {
      console.log("handle intial data entry");
      var newData;
      var p1 = new Promise((resolve, reject) => {
      request({
      url: 'https://blooming-plains-66664.herokuapp.com/search_db/all',
      method: "GET",
      }, (error, res, body) => {
        newData = JSON.parse(body)["rows"];
        // console.log(newData);
        if (newData.length == 0){
          
          newData = [{
          "data": "",
          "course_name": "",
          "town_city_area": "",
          "state": "",
          "country": "",
          "world_area": "",
          "holes": "",
          "founded_date": "",
          "type": "",
          "architect_designer": "",
          "value": ""}]
        }
        resolve();
      });
    }).then(()=>{
        console.log("new data");
        //console.log(newData);
          this.setState({data: newData});    
    });
  }


  handleNewData(newData){
    //alert("wait");
    console.log(newData);
    this.setState({data: newData});
    }

  handleChangePage(e) {
    if (e.target.value === "next") {
      this.setState({
        buttonPageIndex: this.state.buttonPageIndex + 1
      })
    } else if (e.target.value === "prev") {
      this.setState({
        buttonPageIndex: this.state.buttonPageIndex - 1
      })
    } else {
      this.setState({
        pageNumber: e.target.value
      })
    }
  }

// todo tomorrow: get next button to get the next number of buttons necessary, 
// should be add a parameter down below, then add another line
  createButtons = (totalButtonsNeeded) => {
    let buttons = []
    let start = this.state.buttonPageIndex * this.state.numberButtons
    let end = Math.min(start+this.state.numberButtons, totalButtonsNeeded)
    if (this.state.buttonPageIndex !== 0) {
      buttons.push(<Button onClick={this.handleChangePage} value="prev">{"<"}</Button>)
    }
    for (let i = start + 1; i <= end; i++) {
       if (this.state.pageNumber == i) {
         buttons.push(<ButtonWrapper handleChangePage={this.handleChangePage}
         active={true}
         value={i}/>)
       } else {
         buttons.push(<ButtonWrapper handleChangePage={this.handleChangePage}
         active={false}
         value={i}/>)
       }
    }
    
    if (end < totalButtonsNeeded) {
      buttons.push(<Button onClick={this.handleChangePage} value="next">></Button>)
    }
    
    return buttons
  }

  // in Math.ceil -> passing total number of buttons needed 
  render() {
      if (this.state.data == null) {
          return (
              <div className="App">
                <div className="title">
                    Card Tracker
                </div>
                <div className="sidenav">
                  <div className="golf">
                    Golf
                  </div>
                  <SidebarOption text={"Find"} type={1} onDataChange={this.handleNewData}/>
                  <SidebarOption text={"Upload"} type={3} onDataChange={this.handleNewData}/>
                  <SidebarOption text={"Download"} type={4} onDataChange={this.handleNewData}/>
                </div>
              </div>
            );
      } else {
    return (
      <div className="App">
        <div className="title">
            Card Tracker
        </div>
        <div className="sidenav">
          <div className="golf">
            Golf
          </div>
          <SidebarOption text={"Find"} type={1} onDataChange={this.handleNewData}/>
          <SidebarOption text={"Upload"} type={3} onDataChange={this.handleNewData}/>
          <SidebarOption text={"Download"} type={4} onDataChange={this.handleNewData}/>
        </div>
        <div className="Table">
          <DisplayMessage pageNumber={this.state.pageNumber} 
          pageSize={this.state.pageSize}
          numberOfItems={this.state.data.length}/>
              

          <Table pageNumber={this.state.pageNumber} pageSize={this.state.pageSize}
          data={this.state.data}/>
          <div className="bottomnav">
            <ButtonGroup onChange={this.handleChangePage}>
              {this.createButtons(Math.ceil(this.state.data.length/this.state.pageSize))}
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
}

export default App;