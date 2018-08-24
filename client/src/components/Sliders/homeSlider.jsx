import React from "react";
import Slide from "./slide.jsx";
import {  withStyles } from "material-ui";

const styles = {
  root:{
    display:'relative',
    minWidth:1900,
  }

}

class HomeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.changeSlide, 8000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  changeSlide = () => {
    if (this.state.index < 3) {
      const index = this.state.index;
      this.setState({
        index: index + 1
      });
    } else {
      this.setState({
        index: 0
      });
    }
  };
  setInProp(index) {
    if (index === this.state.index) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const classes = this.props.classes
    return (
        <div className={classes.root} >
          <Slide inProp={this.setInProp(0)} />
        </div>
    );
  }
}

export default withStyles(styles)(HomeSlider);
