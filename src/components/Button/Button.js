import React, { Component, Fragment } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import "./Button.css";

const Buttons = () => (
    <div className="contain">
      <RaisedButton className="btn" label="Film" />
      <RaisedButton className="btn" label="Series" primary={true} />
      <RaisedButton className="btn" label="All" secondary={true} />
    </div>
  );
  
  export default Buttons;