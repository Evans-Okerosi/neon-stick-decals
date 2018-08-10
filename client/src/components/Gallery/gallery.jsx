import React from 'react';
import { LazyLoadedSkin } from 'components';
import { Grid } from 'material-ui';
import PropTypes from 'prop-types';

class Gallery extends React.Component {
  render() {
    const { numberOfItems } = this.props;
    let { images } = this.props;
    // ensure gallery is not called with null images
    if (!images) {
      if (numberOfItems) {
        images = new Array(numberOfItems);
      } else {
        images = new Array(6);
      }
    }
    if (numberOfItems) {
      images = images.slice(0, numberOfItems);
    }
    return (
      <Grid container spacing={8} justify="space-around">
        {images.map((image, index) => {
          return (
            <Grid item xs={6} md={4}>
              <LazyLoadedSkin image={image} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.string,
  // optional number of items to be displayed.
  numberOfItems: PropTypes.number
};
export default Gallery;
