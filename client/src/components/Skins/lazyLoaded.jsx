import React from "react";
import ImageCard from "./imageCard"
import MainSkin from "./main.jsx";
import PropTypes from "prop-types";
import LazyLoad from 'react-lazyload'

function LazyLoadedSkin(props){
    return (
      <LazyLoad height={200} once>
        <ImageCard
          image={props.image}
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
