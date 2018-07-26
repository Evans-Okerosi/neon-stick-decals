import React from 'react';
import PropTypes from 'prop-types'
import { WithStyles, Grid, withStyles } from 'material-ui';
import { SignupForm } from 'components';
import {signupPageStyle} from 'variables/styles.jsx'
class SignuPage extends React.Component {
  render() {
    const classes = this.props.classes
    return (
        <Grid className={classes.background} container justify="center" alignItems="center">
          <SignupForm />
        </Grid>
    );
  }
}
SignuPage.PropTypes = {
  classes : PropTypes.object.isRequired
}
export default withStyles(signupPageStyle)(SignuPage);
