import React from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";

const BlackBox = () => (
  <Motion defaultStyle={{ scaleX: 1 }} style={{ scaleX: spring(0) }}>
    {interpolatingStyle => (
      <div
        className="black-box"
        style={{
          opacity: 0 ? 1 : 0
        }}
      />
    )}
  </Motion>
);

BlackBox.PropTypes = {
  reverseDirection: PropTypes.bool
};

export default BlackBox;
