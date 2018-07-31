import React from 'react';
import { ButtonBase, Typography, withStyles, Badge } from 'material-ui';
import SVGTick from './svgTick';
import { interestButtonStyle } from './styles';

function InterestButton(props) {
  const { image, classes } = props;
  return (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
            background: `url(${image.url})`
          }}
        >
          <span className={classes.overlay}>
          <SVGTick/>
          </span>
          <span className={classes.title}>{image.title}</span>
          
        </ButtonBase>
  );
}

export default withStyles(interestButtonStyle, { withTheme: true })(
  InterestButton
);
