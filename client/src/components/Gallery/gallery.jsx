import React from "react";
import { LazyLoadedSkin } from "components";
import { Grid } from "material-ui";
import PropTypes from "prop-types";

class Gallery extends React.Component {
  render() {
    const images = this.props.images;
    var display = images.map(image => {
      return (
        <Grid item xs={6} md={4}>
          <LazyLoadedSkin image={image}
          />
        </Grid>
      );
    });

    return (
      <Grid container spacing={8} justify="space-around">
        {display}
      </Grid>
    );
  }
}
Gallery.propTypes = {
  images: PropTypes.string,
  onOrderButtonClick: PropTypes.func
};
export default Gallery;
