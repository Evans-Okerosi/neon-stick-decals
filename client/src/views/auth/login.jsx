import React from "react";
import PropTypes from "prop-types";
import { withStyles, Grid } from "material-ui";
import { LoginForm } from "components";
import {loginPage} from "variables/styles.jsx"
class LoginPage extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.background}>
        <Grid xs={12} justify="center" container alignContent="center" >
          <Grid xs={12} md={4} item spacing={40} >
            <LoginForm />
          </Grid>
        </Grid>
      </div>
    );
  }
}
LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(loginPage)(LoginPage);
