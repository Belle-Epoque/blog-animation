import React from "react";
import { Motion, spring } from "react-motion";

const BlackBox = ({ reverseDirection = true }) => (
  <Motion defaultStyle={{ scaleX: 1 }} style={{ scaleX: spring(0) }}>
    {interpolatingStyle => (
      <div
        className="black-box"
        style={{
          transformOrigin: reverseDirection ? `left` : `right`,
          transition: '0.4s linear',
          transform: `scaleX(${interpolatingStyle.scaleX})`
        }}
      />
    )}
  </Motion>
);

export default BlackBox;
