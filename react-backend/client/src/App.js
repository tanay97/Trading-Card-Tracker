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
      pageSize: 2,   // todo: make button saying what pageSize is
      numberButtons: 2,  // todo: change based on screen size
      data: [  
         {  
            "data":613,
            "course_name":"Carroll Park G Cr",
            "course_changes":null,
            "town_city_area":"Baltimore",
            "state":"MD",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1925",
            "type":"P",
            "architect_designer":"Hook, Gus",
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"YES IT IS 12 HOLES-Card 1",
            "p":null,
            "other_country":"AUS",
            "other_data":8790
         },
         {  
            "data":4851,
            "course_name":"Carroll Park G Cr",
            "course_changes":null,
            "town_city_area":"Baltimore",
            "state":"MD",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1925",
            "type":"P",
            "architect_designer":"Hook, Gus",
            "value":null,
            "issue_date_known":"2003",
            "changed_colname":"Y-8",
            "notes":"Cd 2/YES IT IS 12 HOLES",
            "p":null,
            "other_country":"CAN",
            "other_data":33464
         },
         {  
            "data":14378,
            "course_name":"Rolling Turf G Cr",
            "course_changes":null,
            "town_city_area":"Schwenksville",
            "state":"PA",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1960",
            "type":"P",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"Is- 12",
            "p":null,
            "other_country":"USA",
            "other_data":2851
         },
         {  
            "data":14942,
            "course_name":"Carroll Park G Cr",
            "course_changes":null,
            "town_city_area":"Baltimore",
            "state":"MD",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1925",
            "type":"P",
            "architect_designer":"Hook, Gus",
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"Cd 3/YES IT IS 12 HOLES",
            "p":null,
            "other_country":"USA",
            "other_data":7421
         },
         {  
            "data":15192,
            "course_name":"Bayview Retirees G Cr",
            "course_changes":null,
            "town_city_area":"N Summit,Toledo",
            "state":"OH",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1920",
            "type":"PR",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"YES 12H",
            "p":null,
            "other_country":"USA",
            "other_data":10680
         },
         {  
            "data":16584,
            "course_name":"Holly Ridge G Cr",
            "course_changes":"SN",
            "town_city_area":"Harbinger",
            "state":"NC",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":null,
            "type":"P",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"N-18",
            "p":null,
            "other_country":"USA",
            "other_data":12208
         },
         {  
            "data":17903,
            "course_name":"Fox Run G Cl",
            "course_changes":null,
            "town_city_area":"Rockstream",
            "state":"NY",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1964",
            "type":"P",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"12H",
            "p":null,
            "other_country":"USA",
            "other_data":13539
         },
         {  
            "data":22915,
            "course_name":"Carroll Park G Cr",
            "course_changes":null,
            "town_city_area":"Baltimore",
            "state":"MD",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1925",
            "type":"P",
            "architect_designer":"Hook, Gus",
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"Cd 4/YES IT IS 12 HOLES",
            "p":null,
            "other_country":"USA",
            "other_data":18933
         },
         {  
            "data":31325,
            "course_name":"Holly Ridge G Cr",
            "course_changes":"SN",
            "town_city_area":"Harbinger",
            "state":"NC",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":null,
            "type":"P",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"Cd 2/N-18",
            "p":null,
            "other_country":"USA",
            "other_data":29207
         },
         {  
            "data":613,
            "course_name":"Carroll Park G Cr",
            "course_changes":null,
            "town_city_area":"Baltimore",
            "state":"MD",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1925",
            "type":"P",
            "architect_designer":"Hook, Gus",
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"YES IT IS 12 HOLES-Card 1",
            "p":null,
            "other_country":"AUS",
            "other_data":8790
         },
         {  
            "data":4851,
            "course_name":"Carroll Park G Cr",
            "course_changes":null,
            "town_city_area":"Baltimore",
            "state":"MD",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1925",
            "type":"P",
            "architect_designer":"Hook, Gus",
            "value":null,
            "issue_date_known":"2003",
            "changed_colname":"Y-8",
            "notes":"Cd 2/YES IT IS 12 HOLES",
            "p":null,
            "other_country":"CAN",
            "other_data":33464
         },
         {  
            "data":14378,
            "course_name":"Rolling Turf G Cr",
            "course_changes":null,
            "town_city_area":"Schwenksville",
            "state":"PA",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1960",
            "type":"P",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"Is- 12",
            "p":null,
            "other_country":"USA",
            "other_data":2851
         },
         {  
            "data":14942,
            "course_name":"Carroll Park G Cr",
            "course_changes":null,
            "town_city_area":"Baltimore",
            "state":"MD",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1925",
            "type":"P",
            "architect_designer":"Hook, Gus",
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"Cd 3/YES IT IS 12 HOLES",
            "p":null,
            "other_country":"USA",
            "other_data":7421
         },
         {  
            "data":15192,
            "course_name":"Bayview Retirees G Cr",
            "course_changes":null,
            "town_city_area":"N Summit,Toledo",
            "state":"OH",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1920",
            "type":"PR",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"YES 12H",
            "p":null,
            "other_country":"USA",
            "other_data":10680
         },
         {  
            "data":16584,
            "course_name":"Holly Ridge G Cr",
            "course_changes":"SN",
            "town_city_area":"Harbinger",
            "state":"NC",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":null,
            "type":"P",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"N-18",
            "p":null,
            "other_country":"USA",
            "other_data":12208
         },
         {  
            "data":17903,
            "course_name":"Fox Run G Cl",
            "course_changes":null,
            "town_city_area":"Rockstream",
            "state":"NY",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1964",
            "type":"P",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"12H",
            "p":null,
            "other_country":"USA",
            "other_data":13539
         },
         {  
            "data":22915,
            "course_name":"Carroll Park G Cr",
            "course_changes":null,
            "town_city_area":"Baltimore",
            "state":"MD",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":"1925",
            "type":"P",
            "architect_designer":"Hook, Gus",
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"Cd 4/YES IT IS 12 HOLES",
            "p":null,
            "other_country":"USA",
            "other_data":18933
         },
         {  
            "data":31325,
            "course_name":"Holly Ridge G Cr",
            "course_changes":"SN",
            "town_city_area":"Harbinger",
            "state":"NC",
            "country":"USA",
            "world_area":"NA",
            "holes":"12",
            "founded_date":null,
            "type":"P",
            "architect_designer":null,
            "value":null,
            "issue_date_known":null,
            "changed_colname":null,
            "notes":"Cd 2/N-18",
            "p":null,
            "other_country":"USA",
            "other_data":29207
         }
      ] // note data is static here in state temporarily...
    };
    this.handleChangePage=this.handleChangePage.bind(this);
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
        <div className="sidenav">
          <SidebarOption text={"Input/Find"}/>
          <SidebarOption text={"Sort"}/>
          <SidebarOption text={"Upload"}/>
          <SidebarOption text={"Save to Desktop"}/>
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