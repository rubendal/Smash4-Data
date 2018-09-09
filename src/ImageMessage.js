import React, { Component } from 'react';

class ImageMessage extends Component {
  constructor(props){
    super(props);

    this.image = props.image === undefined ? "/img/darkpit-wait2.gif" : props.image;
    this.alt = props.alt === undefined ? "Loading" : props.alt;
    this.message = props.message !== undefined ? props.message : "Loading...";
    this.class = props.class === undefined ? "loading-image" : "";
  }

  shouldComponentUpdate(props, state){
    this.image = props.image === undefined ? "/img/darkpit-wait2.gif" : props.image;
    this.alt = props.alt === undefined ? "Loading" : props.alt;
    this.message = props.message !== undefined ? props.message : "Loading...";
    this.class = props.class === undefined ? "loading-image" : props.class;
    
    return true;
  }

  render() {
    return (
      <div id="message-container">
        <img className={"message-image " + this.class} src={this.image} alt={this.alt} />
        <br/>
        <p className="message-label">{this.message}</p>
      </div>
    );
  }
}

export default ImageMessage;
