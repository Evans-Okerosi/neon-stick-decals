import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Paper } from 'material-ui';
import { connect } from 'react-redux';
import { Gallery, HomeSlider, ContactForm } from 'components';
import { requestImages } from 'actions';

const mapStateToProps = state => ({
  images: state.images.images,
  isFetching: state.isFetching
});
const mapDispatchToProps = dispatch => ({});
class Home extends React.Component {
  componentDidMount() {}
  render() {
    const { images, isFetching } = this.props;
    if (isFetching) {
      return (
        <div
          style={{
            background: 'grey',
            width: '100%',
            height: '100%'
          }}
        >
          <Typography align="center">loading</Typography>
        </div>
      );
    }
    return (
      <div>
        <HomeSlider />
        <Typography align="center" variant="display3">
          {'Glow Decals '}
        </Typography>
        <Grid spacing={8} container>
          <Grid xs={6} sm={4} item>
            <Paper
              elevation={6}
              style={{
                padding: 16,
                margin: 8
              }}
            >
              <Typography variant="body1">
                We take ugly stuff and make it awsome. We take ugly stuff and
                make it awsome We take ugly stuff and make it awsome. We take
                ugly stuff and make it awsome.We take ugly stuff and make it
                awsome. We take ugly stuff and make it awsome. We take ugly
                stuff and make it awsome We take ugly stuff and make it awsome.
                We take ugly stuff and make it awsome.We take ugly stuff and
                make it awsome.
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={6} sm={4} item>
            <Paper
              elevation={6}
              style={{
                padding: 16,
                margin: 8
              }}
            >
              <Typography variant="body1">
                We take ugly stuff and make it awsome. We take ugly stuff and
                make it awsome We take ugly stuff and make it awsome. We take
                ugly stuff and make it awsome.We take ugly stuff and make it
                awsome. We take ugly stuff and make it awsome. We take ugly
                stuff and make it awsome We take ugly stuff and make it awsome.
                We take ugly stuff and make it awsome.We take ugly stuff and
                make it awsome.
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={6} sm={4} item>
            <Paper
              elevation={6}
              style={{
                padding: 16,
                margin: 8
              }}
            >
              <Typography variant="body1">
                We take ugly stuff and make it awsome. We take ugly stuff and
                make it awsome We take ugly stuff and make it awsome. We take
                ugly stuff and make it awsome.We take ugly stuff and make it
                awsome. We take ugly stuff and make it awsome. We take ugly
                stuff and make it awsome We take ugly stuff and make it awsome.
                We take ugly stuff and make it awsome.We take ugly stuff and
                make it awsome.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Gallery images={images} numberOfItems={6} />
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
  getImages: PropTypes.func.isRequired,
  images: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
