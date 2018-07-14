import React from "react";
import { WithStyles, Grid } from "material-ui";
import {SignupForm} from "components";
class SignuPage extends React.Component {
  render() {
    return (
      <Grid>
        <SignupForm />
      </Grid>
    );
  }
}
export default SignuPage;
