import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Typography, Grid } from 'material-ui';
import { Gallery, HomeSlider, ContactForm } from 'components';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryImages: [
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427',
        'https://source.unsplash.com/random/640x427'
      ]
    };
  }
  render() {
    if (!this.props.onOrderButtonClick) {
      console.log(
        'Please supply the onOrderButtonClick to gallery props to enable order button on skins'
      );
    }
    return (
      <div>
        <HomeSlider />
        <Typography align="center" variant="display3">
          Sleek Craft Decals{' '}
        </Typography>
        <Grid spacing={8} container>
          <Grid xs={6} sm={4} item>
            <Typography variant="body1">
              We take ugly stuff and make it awsome. We take ugly stuff and make
              it awsome We take ugly stuff and make it awsome. We take ugly
              stuff and make it awsome.We take ugly stuff and make it awsome. We
              take ugly stuff and make it awsome. We take ugly stuff and make it
              awsome We take ugly stuff and make it awsome. We take ugly stuff
              and make it awsome.We take ugly stuff and make it awsome.
            </Typography>
          </Grid>
          <Grid xs={6} sm={4} item>
            <Typography type="body1">
              We take ugly stuff and make it awsome. We take ugly stuff and make
              it awsome We take ugly stuff and make it awsome. We take ugly
              stuff and make it awsome.We take ugly stuff and make it awsome. We
              take ugly stuff and make it awsome. We take ugly stuff and make it
              awsome We take ugly stuff and make it awsome. We take ugly stuff
              and make it awsome.We take ugly stuff and make it awsome.
            </Typography>
          </Grid>
          <Grid xs={6} sm={4} item>
            <Typography type="body1">
              We take ugly stuff and make it awsome. We take ugly stuff and make
              it awsome We take ugly stuff and make it awsome. We take ugly
              stuff and make it awsome.We take ugly stuff and make it awsome. We
              take ugly stuff and make it awsome. We take ugly stuff and make it
              awsome We take ugly stuff and make it awsome. We take ugly stuff
              and make it awsome.We take ugly stuff and make it awsome.
            </Typography>
          </Grid>
        </Grid>
        <Gallery images={this.state.galleryImages} />
        <Grid container>
          <Grid item xs={12} sm={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography type="body2">wow again</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}
Home.propTypes = {
  onOrderButtonClick: PropTypes.func
};

export default Home;
