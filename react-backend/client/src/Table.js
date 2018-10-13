import React, { Component } from 'react';
import './Table.css';

// child components
import TableRow from './TableRow';
import { Table as T} from 'react-bootstrap';

var table_headings = {
      "number" : "Number",
      "course_name" : "Course",
      "town_city_area" : "City",
      "state" : "State",
      "country": "Country",
      "world_area" : "Continent",
      "holes" : "Holes",
      "type" : "Type",
      "founded_date" : "Founded Date",
      "architect_designer" : "Designer",
      "value" : "Value",
      "notes" : "Notes"
    };

class Table extends Component {
  constructor(props) {
    super(props);
    // props.pageNumber
    // props.pageSize
  }

  render() {
    if(this.props.data == undefined || this.props.data.length < 1) {
      // should show screen that no results were found
    } else {
    	return (
        <T striped bordered condensed hover className="T-class">
          <thead className="TableHead">
            <tr>
              {Reflect.ownKeys(this.props.data[0]).map(property => (<th className="table_heading">{table_headings[property]}</th>))}
            </tr>
          </thead>
          <tbody className="TableBody">
            {this.props.data.slice((this.props.pageNumber-1)*this.props.pageSize, 
              (this.props.pageNumber)*this.props.pageSize).map(card => (
              <tr>
                {Object.values(card).map(value => (
                  <td align="left" className="cardRow">{value}</td>))}
              </tr>))}
          </tbody>
        </T>
      );
    }
  }
}

export default Table;