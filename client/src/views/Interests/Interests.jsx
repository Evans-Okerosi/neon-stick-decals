import React from 'react';
import blue from '@material-ui/core/colors/blue'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Grid, Typography, Button, Paper } from 'material-ui';
import { interestsStyle } from './styles';
import InterestsButton from './InterestsButton';
import architecture from 'static/architecture.jpg';
import nature from 'static/nature.jpg';
import work from 'static/work.jpg';
import music from 'static/music.jpg';
import ocean from 'static/oceans.jpg';
import food from 'static/food.jpg';
import texture from 'static/texture.jpg';
import abstract from 'static/abstract.jpg';
import colors from 'static/colors.jpg';
const images = [
  {
    url: architecture,
    title: 'Architecture',
    width: '30%'
  },
  {
    url: food,
    title: 'Food',
    width: '30%'
  },
  {
    url: nature,
    title: 'Nature',
    width: '30%'
  },
  {
    url: work,
    title: 'Work',
    width: '30%'
  },
  {
    url: abstract,
    title: 'Abstract',
    width: '30%'
  },
  {
    url: colors,
    title: 'Color',
    width: '30%'
  },
  {
    url: texture,
    title: 'Texture',
    width: '30%'
  },
  {
    url: music,
    title: 'Music',
    width: '30%'
  },
  {
    url: ocean,
    title: 'Wallpaper',
    width: '30%'
  }
];

class Interests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
    this.buttonClick = this.buttonClick.bind(this);
  }
  buttonClick() {
    this.props.history.push('/Home');
  }

  render() {
    const { classes } = this.props;
    const { selected } = this.state;
    return (
      <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="center"
      >
        <Paper style={{
       
          width:'100%',
          textAlign:'center',
         
        }} elevation={6}>
          <Typography style={{
            color:'black',
            
          }} variant="display2">What do you love?</Typography>
          <Typography style={{
            color:blue
          }} >
            Slect anything that you think you love so that we may serve you
            better
          </Typography>
        </Paper>

        {images.map(image => (
          <InterestsButton
            selected={selected}
            onButtonClick={this.handleButtonClick}
            image={image}
          />
        ))}

        <Button onClick={this.buttonClick} className={classes.saveButton}>
          <Typography
            style={{
              color: 'darkred'
            }}
            variant="display2"
          >
            done!
          </Typography>
        </Button>
      </Grid>
    );
  }
}

Interests.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};

export default withStyles(interestsStyle, { withTheme: true })(
  withRouter(Interests)
);
