import React from "react";
import axios from "axios"
import Transition from "react-transition-group/Transition";
import{ Link } from "react-router-dom"
import { withStyles } from "material-ui";
import { imageResponsive } from "variables/styles.jsx";
import { PropTypes } from "prop-types";



const styles = {
  imageResponsive: imageResponsive
};

class MainSkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProp: false,
      liked: false,
    };
    this.onLoad = this.onLoad.bind(this)
  }
  onLoad(e) {
    e.preventDefault();
    this.setState({
      inProp: true
    });
  }
  handleLike() {
    //### change the Button state before making the request so users can quickly see result of their action
    this.setState({
      liked: true
    });
    axios
      .post("/skin/like", {
        uuid: this.props.uuid
      })
      .catch(error => {
        //### revert like
        this.setState({
          liked: false
        });
        console.log(error.response.data);
      });
  }
  render() {
    const LinkToCart = props =><Link to="Cart"{...props}/>
    let caption;
    this.props.caption
      ? (caption = this.props.caption)
      : (caption = "Amazing Skin");
    const classes = this.props.classes;
    //### URLs
    const url_large = this.props.uuid;
    const url_medium = this.props.uuid;
    const url_small = this.props.uuid;
    // ***
    const duration = 300;
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
      padding: 0
    };
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 }
    };
    return (
      <div onLoad={this.onLoad}>
        <Transition in={this.state.inProp} timeout={duration}>
          {state => (
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
              <div>
                <img
                  className={classes.imageResponsive}
                  srcSet={`${url_large} 1024w,
                        ${url_medium} 640w,
                        ${url_small} 320w`}
                  src={url_medium}
                  alt={caption}
                />
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}
MainSkin.propTypes = {
  classes: PropTypes.object.isRequired,
  uuid: PropTypes.string.isRequired,
  onOrderButtonClick: PropTypes.func
};

export default withStyles(styles)(MainSkin);
