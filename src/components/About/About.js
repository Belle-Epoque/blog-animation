import React from "react";
import Transition from "react-transition-group/Transition";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

const About = ({ in: inProp }) => (
  <Transition timeout={1000}>
    {status => (
      <div className={`fade fade-${status}`}>I'm A fade Transition!</div>
    )}
  </Transition>
);

export default About;
