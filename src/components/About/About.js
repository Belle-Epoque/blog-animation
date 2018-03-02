import React, { Component } from "react";
import "./About.css";
import { TimelineLite } from "gsap";
import RaisedButton from "material-ui/RaisedButton";

class About extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container">
        <h1>{'Welcome on Scuds search engine'}</h1>
        <h3>{'and...'}</h3>
        <h2>{'Enjoy !'}</h2>
      </div>
    );
  }
}

export default About;
