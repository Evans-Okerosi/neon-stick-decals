/**
 * This component is intended to be used with the Gallery component
 */
import React from "react";
import axios from "axios";
import { OrderContext } from "variables/Context/order.jsx";
import { withStyles } from "material-ui";
import { caption, thumbnail } from "variables/styles.jsx";
import { Bttn } from "components";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import MainSkin from "./main.jsx";

const styles = theme => ({
  thumbnail: thumbnail,
  caption: caption,
  moreInfo: {
    margin: 0,
    padding: 0
  }
});

class GallerySkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: "",
      caption: "",
      moreInfo: "",
      liked: false
    };

    // const url = `https://ucarecdn.com/${this.props.imageUUID}/size/${this.props.imageSize}/${this.props.caption}.com`
  }
  componentDidMount() {
    axios
      .get("/skin/info", {
        params: {
          uuid: this.props.uuid
        }
      })
      .then(response => {
        this.setState({
          info: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const classes = this.props.classes;
    return (
      <LazyLoad height={200}>
        <MainSkin
          uuid={this.props.uuid}
          onOrderButtonClick={this.props.onOrderButtonClick}
        />
        <div className={classes.caption}>
          <OrderContext.Consumer>
            {/**
             * This request is hanlded in the App container
             * 
             */
            onOrderButtonClick => (
              <Bttn onClick={e =>{
                e.preventDefault()
                 onOrderButtonClick(this.props.uuid)}}>
                Buy
              </Bttn>
            )}
          </OrderContext.Consumer>
          <p className={classes.moreInfo}>{this.state.moreInfo}</p>
        </div>
      </LazyLoad>
    );
  }
}
GallerySkin.PropTypes = {
  classes: PropTypes.object.isRequired,
  uuid: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onOrderButtonClick: PropTypes.func
};

export default withStyles(styles)(GallerySkin);
