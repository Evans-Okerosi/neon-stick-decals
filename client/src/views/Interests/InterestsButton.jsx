import React from 'react';
import { ButtonBase,  withStyles,  } from 'material-ui';
import SVGTick from './svgTick';
import { interestButtonStyle } from './styles';

class InterestButton extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selected:false
    }
    this.onButtonClick = this.onButtonClick.bind(this)
  }
  onButtonClick(e){
    e.preventDefault()
    this.setState(prevState=>({
      selected:!prevState.selected
    }))
  }
  render(){
    const { image, classes} = this.props;
    const {selected} = this.state
    return (
      <ButtonBase
        onClick={this.onButtonClick}
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
        <SVGTick selected={selected} />
        </span>
        <span className={classes.title}>{image.title}</span>
        
      </ButtonBase>
);
  }
 
}

export default withStyles(interestButtonStyle, { withTheme: true })(
  InterestButton
);
