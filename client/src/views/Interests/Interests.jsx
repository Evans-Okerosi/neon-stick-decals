import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Typography } from 'material-ui';
import { interestsStyle } from './styles';
import InterestsButton from './InterestsButton';

const images = [
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Architecture',
    width: '30%'
  },
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Food',
    width: '30%'
  },
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Nature',
    width: '30%'
  },
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Work',
    width: '30%'
  },
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Abstract',
    width: '30%'
  },
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Color',
    width: '30%'
  },
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Texture',
    width: '30%'
  },
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Music',
    width: '30%'
  },
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Design',
    width: '30%'
  },
  {
    url: 'https://source.unsplash.com/random/640x427',
    title: 'Wallpaper',
    width: '30%'
  }
];

function Interests(props) {
  const { classes } = props;

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
    >
      {images.map(image => (
        <InterestsButton image={image} />
      ))}
      <Typography>My name</Typography>
    </Grid>
  );
}

Interests.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};

export default withStyles(interestsStyle, { withTheme: true })(Interests);
