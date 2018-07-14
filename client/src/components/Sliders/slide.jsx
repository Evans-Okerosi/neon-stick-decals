import React from "react";
import Transition from "react-transition-group/Transition";
import PropTypes from "prop-types";
import image from "assets/img/banner.jpg";
import { withStyles, Typography, } from "material-ui";

const styles = {
  img: {
    display: "block",
    width: "100%",
    height: "auto"
  },
  imgContainer: {
    position: "absolute",
    zIndex: -1
  }
};
class Slide extends React.Component {
  render() {
    const classes = this.props.classes;
    const duration = 800;
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 1
    };
    const transitionStyles = {
      entering: { opacity: 0.4 },
      entered: { opacity: 1 }
    };
    return (
      <Transition in={this.props.inProp} timeout={duration}>
        {state => (
          <div
            style={{ ...defaultStyle, ...transitionStyles[state] }}
            className="slide"
          >
            <div className={classes.imgContainer}>
              <img src={image} alt=" slider " className={classes.img} />
            </div>
            <div className="overlay">
              <div className="info">
                <Typography color="primary" align="center" variant="display3">
                  COME PIC YOUR DESIGN. LOOK AT WHAT YOU LOVE
                </Typography>
                <button className="bttn-warning bttn-fill bttn-md ">Upload Design</button>
              </div>
            </div>
          </div>
        )}
      </Transition>
    );
  }
}
Slide.PropTypes = {
  inProp: PropTypes.bool.isRequired
};
Slide.defaultProps = {
  Classes: "lastSlide"
};

export default withStyles(styles)(Slide);
