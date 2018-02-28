import React, { Component } from "react";
import "./About.css";
import { TimelineLite } from "gsap";
import RaisedButton from "material-ui/RaisedButton";

class About extends Component {
  constructor(props) {
    super(props);
    this.refBox = null;
  }

  animate() {
    const animation = new TimelineLite();
    animation
      .to(this.refBox, 1, { x: 100 })
      .to(this.refBox, 1, { y: 100 })
      .to(this.refBox, 1, { x: 0 })
      .to(this.refBox, 1, { y: 0 });
  }

  render() {
    return (
      <div className="container">
        <RaisedButton
          onClick={() => this.animate()}
          primary={true}
          label="Animate"
        />
        <div className="box" ref={box => (this.refBox = box)} />
      </div>
    );
  }
}

export default About;
