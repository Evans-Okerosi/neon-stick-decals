import React from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid, Button } from 'material-ui';
import { styles } from './styles';
import image1 from 'static/image1.jpg'
class Slide extends React.Component {
  render() {
    const { classes } = this.props;
    const duration = 800;
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 1,
      display: 'relative',
      background:`url(${image1})`,
      backgroundPosition:'cover',
      backgroundReapeat:'no-repeat'
    };
    const transitionStyles = {
      entering: { opacity: 0.4 },
      entered: { opacity: 1 }
    };
    return (
      <Transition in={this.props.inProp} timeout={duration}>
        {state => (
          <div
            style={{ ...defaultStyle, ...transitionStyles[state] }}
            className="slide"
          >
            <div className={classes.imgContainer}>
              
            </div>
            <div className={classes.overlay}>
              <Grid container justify="center" className={classes.text}>
                <Typography  align="center" variant="display3" style={{
                  color:'#fff'
                }} >
                  COME PIC YOUR DESIGN<br/> 
                </Typography>
                <Button className="bttn-warning bttn-fill bttn-md ">
                  Upload Design
                </Button>
              </Grid>
            </div>
          </div>
        )}
      </Transition>
    );
  }
}
Slide.PropTypes = {
  inProp: PropTypes.bool.isRequired
};
Slide.defaultProps = {
  Classes: 'lastSlide'
};

export default withStyles(styles)(Slide);
