import React, { Component } from 'react';
import './SidebarOption.css';

import SidebarDropdown from './SidebarDropdown';
var request = require('request');
var axios = require('axios');


let inputFind = 1;
let upload = 3;
let download = 4;

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
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
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

  handleDownloadClick() {
    axios({
      url: 'https://blooming-plains-66664.herokuapp.com/download',
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      console.log(response.data);
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
    });
  }

  handleFileUploadChange() {
      var files = this.uploadInputRef.current.files;
      if (files.length > 0) {
        var file = files[0];
        var formData = new FormData();
        formData.append('uploads[]', file, file.name);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://blooming-plains-66664.herokuapp.com/upload', true);
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
    } else if (this.props.type == download) {
        return (
          <div className="SidebarOption" onClick={this.handleDownloadClick}>
            <p className="SidebarOption-p">
                {this.props.text}
            </p>
          </div>
        );
    }else{
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