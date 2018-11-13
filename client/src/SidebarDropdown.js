import React, { Component } from 'react';
import './SidebarDropdown.css';
var request = require("request");

class SidebarDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty state for now
    };
    this.handleSubmit =this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    console.log("hanlde submit");
    this.props.onNewSearch();
    var Data = {};
    var newData;
    var inputForm = document.getElementById("form");
    //console.log("inputForm " + inputForm);
    var emptyString = true;
    for (var i = 0; i < inputForm.length - 1; i++){
      if (inputForm.elements[i].value != '') {
        emptyString = false;
      }
      Data[inputForm.elements[i].name] = "%"+inputForm.elements[i].value+"%";
    }
    //console.log(Data);
    if (emptyString) {
      console.log("empty String");
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
        this.props.onDataChange(newData);
    });
  } else {
    var p2 = new Promise((resolve, reject) => {
      request({
      url: 'https://blooming-plains-66664.herokuapp.com/search_db',
      method: "GET",
      qs: Data,
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
      this.props.onDataChange(newData);
    });
  }
    
    e.preventDefault();
  }

  render() {
    return (
      <div className="SidebarDropdown">
        <form className="Dropdown-form" onSubmit={this.handleSubmit} id="form">
          <div className="label">
            <div>
                Course Name
              <input type="text" name="course_name" className="input"/>
            </div><br/>
          </div>
          <div className="label">
            <div>
              Holes
              <input type="text" name="holes" className="input" value="18"/>
            </div><br/>
          </div>
          <div className="label">
            <div>
              Town
              <input type="text" name="town_city_area" className="input"/>
            </div><br/>
          </div>
          <div className="label">
            <div>
              State
              <input type="text" name="state" className="input"/>
            </div><br/>
          </div>
          <div className="label">
            <div>
              Country
              <input type="text" name="country" className="input"/>
            </div><br/>
          </div>
          <div className="label">
            <label>
              Continent
              <input type="text" name="world_area" className="input"/>
            </label><br/>
          </div>
          <div className="label">
            <div>
              Founded Date
              <input type="text" name="founded_date" className="input"/>
            </div>
          </div>
          <div className="submit">
            <input type="submit" value="Find" className="submit-btn"/>
          </div>
        </form>
      </div>);
  }
}

export default SidebarDropdown;