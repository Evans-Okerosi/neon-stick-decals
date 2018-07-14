import React from "react";
import Transition from "react-transition-group/Transition";
import PropTypes from 'prop-types'

class Slide extends React.Component {
  
  render() { 
    const duration = 800;
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 1,
    };
    const transitionStyles = {
      entering: { opacity: 0.4 },
       entered: { opacity: 1 },
       exiting: { opacity: 1 },
       exited: { opacity: 0 }
     };
    return (
      <Transition in={this.props.inProp} timeout={duration}>
        {state => (
          <div
            style={{ ...defaultStyle, ...transitionStyles[state] }}
            className="slide"
          >
            <div className="overlay">
                <div className="info">
                  <span>Beautifull</span>
                  <h3>Photography</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed
                    blandit massa vel mauris sollicitudin dignissim.
                  </p>
                </div>
              </div>
            </div>
        )}
      </Transition>
    );
  }
}
Slide.PropTypes = {
  inProp: PropTypes.bool.isRequired,
}
Slide.defaultProps = {
  Classes: "lastSlide"
}

export default (Slide)
