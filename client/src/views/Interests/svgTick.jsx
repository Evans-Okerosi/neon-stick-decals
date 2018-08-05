/**
 * A canvas tick that indicates when an interest has been selected.
 * inspiration from google photos
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles} from 'material-ui';

const styles = theme => ({
  root:{
    position: 'absolute',
    top:0,
    right:0
  }
})
class SVGTick extends React.Component {
  render() {
    const { height, width, selected, classes } = this.props;
    // render nothing if no selected state is provided
    // if(!selected) return null
    const fill = 'grey'
    return (
        <svg
          width={width}
          height={height}
          fill={fill}
          className = {classes.root}
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
    );
  }
}

SVGTick.defaultProps = {
  height: 30,
  width: 30
};

SVGTick.propTypes = {
  classes: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  selected: PropTypes.bool.isRequired
};
export default withStyles(styles)(SVGTick)
