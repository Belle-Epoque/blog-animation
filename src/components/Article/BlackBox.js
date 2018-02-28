import React, { Component } from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";

const BlackBox = ({ reverseDirection = false }) => (
  <Motion defaultStyle={{ scaleX: 1 }} style={{ scaleX: spring(0) }}>
    {interpolatingStyle => (
      <div
        className="black-box"
        style={{
          transformOrigin: reverseDirection ? `left` : `right`,
          transform: `scaleX(${interpolatingStyle.scaleX})`
        }}
      />
    )}
  </Motion>
);

BlackBox.PropTypes = {
  reverseDirection: PropTypes.bool
};

export default BlackBox;
