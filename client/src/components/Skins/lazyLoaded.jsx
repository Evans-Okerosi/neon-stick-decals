import React from "react";
import LazyLoad from "react-lazyload";
import MainSkin from "./main.jsx";
import PropTypes from "prop-types";

function LazyLoadedSkin(props){
    return (
      <LazyLoad height={200} once>
        <MainSkin
          uuid={props.uuid}
          height={props.height}
        />
      </LazyLoad>
    );
  }
LazyLoadedSkin.PropTypes = {
  classes: PropTypes.object.isRequired,
  uuid: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  onOrderButtonClick: PropTypes.func
};

export default LazyLoadedSkin;
