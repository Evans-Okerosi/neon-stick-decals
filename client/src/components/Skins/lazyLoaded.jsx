import React from 'react';
import ImageCard from './imageCard';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

function LazyLoadedSkin(props) {
  const { height, image, addToCart } = props;
  return (
    <LazyLoad height={height} once offset={100}>
      <ImageCard image={image} height={height} addToCart={addToCart} />
    </LazyLoad>
  );
}

LazyLoadedSkin.defaultProps = {
  height: 200
};

LazyLoadedSkin.PropTypes = {
  classes: PropTypes.object.isRequired,
  uuid: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  addToCart: PropTypes.func,
  image: PropTypes.object.isRequired
};

export default LazyLoadedSkin;
