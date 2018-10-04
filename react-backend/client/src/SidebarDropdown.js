import React, { Component } from 'react';
import './SidebarDropdown.css';
var request = require("request");

class SidebarDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty state for now
    };
  }
  handleSubmit(e){
    var data = {};
    var inputForm = document.getElementById("form");
    for (var i = 0; i < inputForm.length - 1; i++){
      data[inputForm.elements[i].name] = inputForm.elements[i].value;
    }
    console.log(data);
    request({
      url: 'http://localhost:3000/search_db',
      method: "GET",
      form: data,
    }, function(error, res, body){
      console.log(error);
    });

    e.preventDefault();
  }

  render() {
  	return (
  		<div className="SidebarDropdown">
        <form className="Dropdown-form" onSubmit={this.handleSubmit} id="form">
          <div className="label">
            <label>
                Course Name
              <input type="text" name="course_name" className="input"/>
            </label><br/>
          </div>
          <div className="label">
            <label>
              Holes
              <input type="text" name="holes" className="input"/>
            </label><br/>
          </div>
          <div className="label">
            <label>
              Town
              <input type="text" name="town_city_area" className="input"/>
            </label><br/>
          </div>
          <div className="label">
            <label>
              State
              <input type="text" name="state" className="input"/>
            </label><br/>
          </div>
          <div className="label">
            <label>
              Country
              <input type="text" name="country" className="input"/>
            </label><br/>
          </div>
          <div className="label">
            <label>
              Continent
              <input type="text" name="world_area" className="input"/>
            </label><br/>
          </div>
          <div className="label">
            <label>
              Founded Date
              <input type="text" name="founded_date" className="input"/>
            </label>
          </div>
          <div className="submit">
            <input type="submit" value="Find" className="submit-btn"/>
          </div>
        </form>
      </div>);
  }
}

export default SidebarDropdown;