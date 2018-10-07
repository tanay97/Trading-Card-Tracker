import React, { Component } from 'react';
import './SidebarOption.css';

import SidebarDropdown from './SidebarDropdown';
var request = require('request');


let inputFind = 1;
let upload = 3;

class SidebarOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.uploadInputRef = React.createRef(); // reference to upload input tag
    this.handleClick =this.handleClick.bind(this);// bind the function
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleFileUploadChange = this.handleFileUploadChange.bind(this);
  }
  handleClick(e) {
    //console.log('urmomgay');
    this.setState(state => ({clicked: !state.clicked}));
    //console.log(this.state.clicked); 
    //this.render(); 
  }

  handleDataChange(newData){
    this.props.onDataChange(newData);
    //console.log(newData);
  }

  handleUploadClick() {
    this.uploadInputRef.current.click();
  }

  handleFileUploadChange() {
      var files = this.uploadInputRef.current.files;
      if (files.length > 0) {
        var file = files[0];
        var formData = new FormData();
        formData.append('uploads[]', file, file.name);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/upload', true);
        xhr.send(formData);
      }
  }

  render() {
    if (this.state.clicked === true && this.props.type == inputFind){
      return (
      <div>
        <div className="SidebarOption" onClick={this.handleClick} style={{background: 'lightblue'}}>
            <p className="SidebarOption-p">
                {this.props.text}
            </p>
        </div>
        <SidebarDropdown text={"Menu"} onDataChange={this.handleDataChange}/>
      </div>
      );
    } else if (this.props.type == upload) {
        return (
          <div className="SidebarOption" onClick={this.handleUploadClick}>
            <p className="SidebarOption-p">
                {this.props.text}
            </p>
            <button id="upload-btn" type="button">Upload File</button>
            <input id="upload-input" ref={this.uploadInputRef} type="file" name="uploads[]" multiple="multiple"
            onChange={this.handleFileUploadChange}/>
          </div>
        );
    } else{
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