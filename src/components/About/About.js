import React, { Component } from "react";
import "./About.css";
import { TimelineLite } from "gsap";
import RaisedButton from "material-ui/RaisedButton";

class About extends Component {
  animate() {
    const animation = new TimelineLite();
    animation
      .to(this.box, 1, { x: 100 })
      .to(this.box, 1, { y: 100 })
      .to(this.box, 1, { x: 0 })
      .to(this.box, 1, { y: 0 });
  }

  render() {
    return (
      <div className="container">
        <RaisedButton
          onClick={this.animate.bind(this)}
          primary={true}
          label="Animate"
        />
        <div className="box" ref={box => (this.box = box)} />
      </div>
    );
  }
}

export default About;
