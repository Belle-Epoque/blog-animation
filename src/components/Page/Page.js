import React, { Component, Fragment } from "react";
import Transition from "react-transition-group/Transition";
import RaisedButton from "material-ui/RaisedButton";
import "./Page.css";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enterAnimation: false
    };
  }

  fade() {
    this.setState({
      enterAnimation: !this.state.enterAnimation
    });
  }
  render() {
    return (
      <Fragment>
        <RaisedButton
          onClick={() => this.fade()}
          primary={true}
          label="Animate"
        />
        <Transition timeout={300} in={this.state.enterAnimation}>
          {state => (
            <div className={`fade fade-${state}`}>
              <h1>test</h1>
            </div>
          )}
        </Transition>
      </Fragment>
    );
  }
}

export default Page;
