import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ButtonWrapper from './ButtonWrapper.js'

// Child components
import SidebarOption from './SidebarOption';
import Table from './Table';
import DisplayMessage from './DisplayMessage';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,  // should never change
      buttonPageIndex: 0,  // should never change
      pageSize: 9,   // todo: make button saying what pageSize is
      numberButtons: 2,  // todo: change based on screen size
      data: [{
        "data": 6,
        "course_name": "Bracebridge G Cl",
        "town_city_area": "Bracebridge",
        "state": "ON",
        "country": "CAN",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1949",
        "type": "SP",
        "architect_designer": null,
        "value": null
    }, {
        "data": 28,
        "course_name": "Annapolis CC",
        "town_city_area": "Annapolis",
        "state": "MD",
        "country": "USA",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1925",
        "type": "SP",
        "architect_designer": "Banks,Charles",
        "value": null
    }, {
        "data": 48,
        "course_name": "Aquia Harbour G & CC",
        "town_city_area": "Stafford",
        "state": "VA",
        "country": "USA",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1960",
        "type": "PR",
        "architect_designer": null,
        "value": null
    }, {
        "data": 79,
        "course_name": "Ardglass G Cl",
        "town_city_area": "Ardglass",
        "state": "DOW",
        "country": "IRL/N",
        "world_area": "EUR",
        "holes": "9",
        "founded_date": "1896",
        "type": "SP",
        "architect_designer": "Jones,David- Rev 1998",
        "value": null
    }, {
        "data": 80,
        "course_name": "Inveraray G Cl",
        "town_city_area": "Inveraray",
        "state": "ARL",
        "country": "SCT",
        "world_area": "EUR",
        "holes": "9",
        "founded_date": "1993",
        "type": "SP",
        "architect_designer": null,
        "value": null
    }, {
        "data": 81,
        "course_name": "Thames Ditton & Esher G Cl",
        "town_city_area": "Scilly Isles,Esher",
        "state": "SRY",
        "country": "ENG",
        "world_area": "EUR",
        "holes": "9",
        "founded_date": "1892",
        "type": null,
        "architect_designer": null,
        "value": null
    }, {
        "data": 88,
        "course_name": "Asheboro Municipal G Cl",
        "town_city_area": "Asheboro",
        "state": "NC",
        "country": "USA",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1937",
        "type": "P",
        "architect_designer": "Ross,Donald",
        "value": null
    }, {
        "data": 100,
        "course_name": "Cashie G & CC",
        "town_city_area": "Windso",
        "state": "NC",
        "country": "USA",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1953",
        "type": "PR",
        "architect_designer": null,
        "value": null
    }, {
        "data": 130,
        "course_name": "Fairways at Kirrie Glen [The]",
        "town_city_area": "Bracebridge",
        "state": "ON",
        "country": "CAN",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "P",
        "type": null,
        "architect_designer": null,
        "value": null
    }, {
        "data": 148,
        "course_name": "Lake Lure M G Cr",
        "town_city_area": "Lake Lure",
        "state": "NC",
        "country": "USA",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1936",
        "type": "P",
        "architect_designer": "Ross,Donald",
        "value": null
    }, {
        "data": 178,
        "course_name": "Markdale CC",
        "town_city_area": "Markdale",
        "state": "ON",
        "country": "CAN",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1964",
        "type": "SP",
        "architect_designer": "Gray,Goldie",
        "value": null
    }, {
        "data": 197,
        "course_name": "Chanticlair G Cr",
        "town_city_area": "Colchester",
        "state": "CT",
        "country": "USA",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1972",
        "type": "P",
        "architect_designer": "Stoloman,Hymie",
        "value": null
    }, {
        "data": 206,
        "course_name": "Tunxis Plantation CC",
        "town_city_area": "Farmington",
        "state": "CT",
        "country": "USA",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1986",
        "type": "P",
        "architect_designer": "Zikorus,Al",
        "value": null
    }, {
        "data": 236,
        "course_name": "Old Lyme CC",
        "town_city_area": "Old Lyme",
        "state": "CT",
        "country": "USA",
        "world_area": "NA",
        "holes": "9",
        "founded_date": "1916",
        "type": "PR",
        "architect_designer": null,
        "value": null
    }
      ] // note data is static here in state temporarily...
    };
    this.handleChangePage=this.handleChangePage.bind(this);
    this.handleNewData = this.handleNewData.bind(this);
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
          <SidebarOption text={"Save to Desktop"} type={4} onDataChange={this.handleNewData}/>
        </div>
        <div className="Table">
          <DisplayMessage pageNumber={this.state.pageNumber} 
          pageSize={this.state.pageSize}
          numberOfItems={this.state.data.length}/>

          <Table pageNumber={this.state.pageNumber} pageSize={this.state.pageSize}
          data={this.state.data}/>
        </div>
        <div className="bottomnav">
          <ButtonGroup onChange={this.handleChangePage}>
            {this.createButtons(Math.ceil(this.state.data.length/this.state.pageSize))}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default App;