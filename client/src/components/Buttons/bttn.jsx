/**
 * React abstraction of bttn.css except for the helper classes
 * bttn.css is used to provide elegent button styles
 * https://github.com/ganapativs/bttn.css
 */

import React from "react";
import PropTypes from "prop-types";
import "assets/css/bttn.css";
class Bttn extends React.Component {
  render() {
    const props = Object.assign({}, this.props);
    var className;
    //### if no class is specified use the default.
    props.type
      ? (className = `bttn-${props.type}`)
      : (className = "bttn-fill");
    //### set button color. if no color is pecified use primary
    props.color
      ? (className += ` bttn-${props.color}`)
      : (className += " bttn-primary");
    /**
     * set button size.
     * will take the first truthy value. if none is specified, it defaults to xs
     */
    var size = " bttn-";
    if (props.xs) {
      size += "lg";
    } else if (props.sm) {
      size += "md";
    } else if (props.md) {
      size += "sm";
    } else {
      size += "xs";
    }
    className += size;
    //### Component to render as base.
    var Component
    props.component 
    ? Component = props.component 
    : Component = "button"
    return <Component onClick={props.onClick} className={className}>{this.props.children}</Component>;
  }
}
Bttn.PropTypes = {
  type: PropTypes.oneOf([
    "simple",
    "bordered",
    "minimal",
    "stretch",
    "jelly",
    "gradient",
    "fill",
    "material-circle",
    "material-flat",
    "pill",
    "float",
    "unite",
    "slant"
  ]),
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  color: PropTypes.oneOf([
    "default",
    "primary",
    "warning",
    "success",
    "danger",
    "royal"
  ]),
  component: PropTypes.oneOfType([PropTypes.string,PropTypes.func])
};

export default Bttn