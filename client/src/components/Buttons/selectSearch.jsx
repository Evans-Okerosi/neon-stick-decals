import React from 'react';
import PropTypes from 'prop-types'
import { ButtonBase, withStyles, Typography } from 'material-ui';

const styles = theme => ({
  root: {
    position: 'relative',
    width: '8%',
    boxSizing: 'borderBox',
    
  },
  title: {
    color: theme.pallete.commons.text
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: 30,
    '&:hover': {
      background: 'rgba(0,0,0,0.2)'
    }
  },
  focusVisible:{}
});
function SelectSearch(props) {
  const { classes, title, image } = props;
  return (
    <ButtonBase
      focusRipple
      className={classes.root}
      focusVisibleClassName={classes.focusVisible}
      style={{
        background: `url(${image})`
      }}
    >
      <span className={classes.overlay} />
      <Typography component="span" className={classes.title}>
        {title}
      </Typography>
    </ButtonBase>
  );
}

SelectSearch.PropTypes = {
    classes: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,

}

export default withStyles(styles)(SelectSearch);
